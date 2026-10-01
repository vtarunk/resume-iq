import re
from typing import Dict, Any, List

SKILL_TAXONOMY = {
    # Languages
    "python": ["python", "py"],
    "javascript": ["javascript", "js"],
    "typescript": ["typescript", "ts"],
    "java": ["java"],
    "c++": ["c++", "cpp"],
    "c#": ["c#", "csharp"],
    "html": ["html", "html5"],
    "css": ["css", "css3"],
    "sql": ["sql"],
    
    # Frameworks & Libraries
    "react": ["react", "reactjs", "react.js"],
    "fastapi": ["fastapi"],
    "django": ["django"],
    "flask": ["flask"],
    "nodejs": ["node.js", "nodejs", "node"],
    "express": ["express", "expressjs"],
    "vue": ["vue", "vuejs"],
    "angular": ["angular"],
    
    # Databases & Infrastructure
    "postgresql": ["postgresql", "postgres"],
    "mysql": ["mysql"],
    "mongodb": ["mongodb", "mongo"],
    "docker": ["docker"],
    "kubernetes": ["kubernetes", "k8s"],
    "aws": ["aws", "amazon web services"],
    "azure": ["azure"],
    "git": ["git", "github", "gitlab"],
    "rest api": ["rest api", "restful api", "rest apis"]
}

def extract_skills_and_evidence(text: str) -> Dict[str, str]:
    """Extracts skills and captures the sentence where each skill was found as evidence."""
    sentences = re.split(r'[.\n!]+', text)
    found_skills: Dict[str, str] = {}
    
    for sentence in sentences:
        cleaned = sentence.strip()
        if not cleaned:
            continue
        cleaned_lower = cleaned.lower()
        
        for canonical_name, aliases in SKILL_TAXONOMY.items():
            if canonical_name in found_skills:
                continue
            for alias in aliases:
                pattern = r'\b' + re.escape(alias) + r'\b'
                if re.search(pattern, cleaned_lower):
                    found_skills[canonical_name] = cleaned
                    break
                    
    return found_skills

def analyze_match(resume_text: str, jd_text: str) -> Dict[str, Any]:
    """Performs evidence-backed skill extraction and generates production metrics."""
    resume_skills_map = extract_skills_and_evidence(resume_text)
    jd_skills_map = extract_skills_and_evidence(jd_text)
    
    jd_skill_keys = list(jd_skills_map.keys())
    matched_skills = []
    missing_skills = []
    job_requirements_breakdown = []
    
    for skill in jd_skill_keys:
        display_skill = skill.capitalize() if len(skill) > 3 else skill.upper()
        
        if skill in resume_skills_map:
            matched_skills.append(display_skill)
            job_requirements_breakdown.append({
                "skill": display_skill,
                "status": "Strong Match",
                "evidence": resume_skills_map[skill]
            })
        else:
            missing_skills.append(display_skill)
            job_requirements_breakdown.append({
                "skill": display_skill,
                "status": "Missing",
                "evidence": "No explicit evidence found in resume text."
            })

    total_jd_skills = len(jd_skill_keys)
    match_score = round((len(matched_skills) / total_jd_skills) * 100) if total_jd_skills > 0 else 50
    
    has_structure = bool(re.search(r'(experience|education|projects|skills)', resume_text, re.IGNORECASE))
    ats_score = min(98, match_score + (15 if has_structure else 5))

    # Actionable recommendations without fabricating fake experience
    improvement_actions = []
    for missing in missing_skills[:3]:
        improvement_actions.append(
            f"'{missing}' is required by this job description but was not detected. "
            f"If you have relevant experience with {missing}, explicitly mention it in your resume."
        )
        
    if not improvement_actions:
        improvement_actions.append("Your technical skills align well with the job posting! Focus on adding quantified metrics to your project achievements.")

    return {
        "match_score": match_score,
        "ats_compatibility": ats_score,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "job_requirements": job_requirements_breakdown,
        "recommendations": improvement_actions,
        "summary": f"Your resume matches {match_score}% of the required technical stack."
    }