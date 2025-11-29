
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from astrologer_agent import agent, calculate_dosha
import uvicorn

app = FastAPI(title="Astrologer Agent API")

# --- Models ---

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

class DoshaRequest(BaseModel):
    birth_date: str
    birth_time: str
    city: str

# --- Endpoints ---

@app.post("/chat", response_model=ChatResponse)
def chat_endpoint(request: ChatRequest):
    """
    Interact with the Astrologer Agent using natural language.
    """
    try:
        # Run the agent with the user's message
        run_output = agent.run(request.message, stream=False)
        # Ensure we get a string content
        content = run_output.content
        if not isinstance(content, str):
            content = str(content)
            
        return ChatResponse(response=content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/calculate_dosha")
def calculate_dosha_endpoint(request: DoshaRequest):
    """
    Directly calculate Dosha using the underlying tool.
    Expected formats:
    - birth_date: "DD-MM-YYYY"
    - birth_time: "HH:MM AM/PM"
    - city: "City Name"
    """
    try:
        result = calculate_dosha(request.birth_date, request.birth_time, request.city)
        return {"result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
