// API Keys (Replace with your actual keys)
export const API_KEYS = {
  HUGGING_FACE: "hf_YOUR_TOKEN_HERE", // Get from huggingface.co/settings/tokens
  GEMINI: "your_gemini_api_key_here", // Get from Google AI Studio
};

// Hugging Face Model
export const HF_MODEL_URL = "https://api-inference.huggingface.co/models/Jayanth2002/dinov2-base-finetuned-SkinDisease";

// App Constants
export const APP_CONFIG = {
  name: "AarogyaNet",
  version: "1.0.0",
  supportedLanguages: ['en', 'hi', 'ta', 'te'],
  maxImageSize: 5 * 1024 * 1024, // 5MB
  cameraQuality: 0.8,
};

// Disease Classifications (from the model)
export const DISEASE_CLASSES = [
  'Basal Cell Carcinoma', 'Darier_s Disease', 'Epidermolysis Bullosa Pruriginosa', 
  'Hailey-Hailey Disease', 'Herpes Simplex', 'Impetigo', 'Larva Migrans', 
  'Leprosy Borderline', 'Leprosy Lepromatous', 'Leprosy Tuberculoid', 
  'Lichen Planus', 'Lupus Erythematosus Chronicus Discoides', 'Melanoma', 
  'Molluscum Contagiosum', 'Mycosis Fungoides', 'Neurofibromatosis', 
  'Papilomatosis Confluentes And Reticulate', 'Pediculosis Capitis', 
  'Pityriasis Rosea', 'Porokeratosis Actinic', 'Psoriasis', 'Tinea Corporis', 
  'Tinea Nigra', 'Tungiasis', 'actinic keratosis', 'dermatofibroma', 'nevus', 
  'pigmented benign keratosis', 'seborrheic keratosis', 'squamous cell carcinoma', 
  'vascular lesion'
];