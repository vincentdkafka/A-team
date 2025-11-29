
from astrologer_agent import agent

try:
    print("Agent type:", type(agent))
    print("Dir agent:", dir(agent))
    
    # Try to run with a simple message
    # We use stream=False to get the full response object if possible
    response = agent.run("Hello", stream=False)
    print("Response type:", type(response))
    print("Response content:", response.content if hasattr(response, 'content') else "No content attr")
    print("Response dir:", dir(response))
except Exception as e:
    print("Error:", e)
