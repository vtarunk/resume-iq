from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from doc_parser import extract_text
from engine import analyze_match

app = FastAPI(title="ResumeIQ API", version="0.2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ALLOWED_EXTENSIONS = {".pdf", ".docx", ".txt"}
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB

@app.get("/")
def health_check():
    return {"status": "online", "app": "ResumeIQ Engine"}

@app.post("/api/analyze")
async def analyze_resume_endpoint(
    file: UploadFile = File(...),
    jd_text: str = Form(...)
):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file uploaded.")
        
    ext = f".{file.filename.split('.')[-1].lower()}"
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail=f"Unsupported format '{ext}'. Upload PDF or DOCX.")

    cleaned_jd = jd_text.strip()
    if not cleaned_jd or len(cleaned_jd) < 20:
        raise HTTPException(status_code=400, detail="Please paste a complete job description (at least 20 characters).")

    contents = await file.read()
    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="File size exceeds 5MB limit.")

    try:
        resume_text = extract_text(contents, file.filename)
        if not resume_text.strip():
            raise HTTPException(status_code=400, detail="Could not read text from uploaded document.")
            
        return analyze_match(resume_text, cleaned_jd)
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis engine error: {str(e)}")