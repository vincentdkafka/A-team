import os
from PyPDF2 import PdfReader
from langchain_openai import OpenAIEmbeddings
from langchain_text_splitters import CharacterTextSplitter
from chromadb import HttpClient
from langchain_community.vectorstores import Chroma

reader = PdfReader('Charaka-Samhita-Acharya-Charaka.pdf')
raw_text = ''
for page in reader.pages:
    text = page.extract_text()
    if text:
        raw_text += text

text_splitter = CharacterTextSplitter(separator="\n", chunk_size=2000, chunk_overlap=200, length_function=len)
texts = text_splitter.split_text(raw_text)

embeddings = OpenAIEmbeddings(openai_api_key=os.getenv("OPENAI_API_KEY"))
client = HttpClient(host="chroma.9fold.org")
db = Chroma.from_texts(texts, embeddings, client=client, collection_name="my_collection")

query = "What is the main topic?"
results = db.similarity_search(query)
print(results)