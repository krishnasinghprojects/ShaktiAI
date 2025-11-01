import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface AccessibilitySettings {
  textToSpeech: boolean;
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  screenReader: boolean;
  voiceNavigation: boolean;
  gestureControl: boolean;
  language: 'en' | 'hi' | 'es' | 'fr' | 'de' | 'ja' | 'zh';
}

export interface TextToSpeechConfig {
  rate: number;
  pitch: number;
  volume: number;
  voice: SpeechSynthesisVoice | null;
  voices: SpeechSynthesisVoice[];
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  textToSpeech: TextToSpeechConfig;
  updateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
  speak: (text: string, language?: string) => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
  isSupported: boolean;
}

const defaultSettings: AccessibilitySettings = {
  textToSpeech: false,
  highContrast: false,
  largeText: false,
  reducedMotion: false,
  screenReader: false,
  voiceNavigation: false,
  gestureControl: false,
  language: 'en'
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

interface AccessibilityProviderProps {
  children: ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [textToSpeech, setTextToSpeech] = useState<TextToSpeechConfig>({
    rate: 1,
    pitch: 1,
    volume: 1,
    voice: null,
    voices: []
  });

  useEffect(() => {
    // Check if speech synthesis is supported
    if ('speechSynthesis' in window) {
      setIsSupported(true);
      
      // Load voices
      const loadVoices = () => {
        const voices = speechSynthesis.getVoices();
        setTextToSpeech(prev => ({
          ...prev,
          voices,
          voice: voices.find(voice => voice.lang.includes('en')) || voices[0] || null
        }));
      };

      loadVoices();
      speechSynthesis.onvoiceschanged = loadVoices;
    }

    // Load saved settings
    const savedSettings = localStorage.getItem('accessibility-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsed });
      } catch (error) {
        console.error('Failed to load accessibility settings:', error);
      }
    }
  }, []);

  const updateSettings = (newSettings: Partial<AccessibilitySettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem('accessibility-settings', JSON.stringify(updatedSettings));
  };

  const speak = (text: string, language?: string) => {
    if (!isSupported || !settings.textToSpeech) return;

    // Cancel any ongoing speech
    speechSynthesis.cancel();
    
    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set voice based on language or current settings
    if (language || settings.language) {
      const targetLang = language || settings.language;
      const voice = textToSpeech.voices.find(v => 
        v.lang.toLowerCase().includes(targetLang.toLowerCase())
      );
      if (voice) {
        utterance.voice = voice;
      }
    } else if (textToSpeech.voice) {
      utterance.voice = textToSpeech.voice;
    }

    utterance.rate = textToSpeech.rate;
    utterance.pitch = textToSpeech.pitch;
    utterance.volume = textToSpeech.volume;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (isSupported) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const value: AccessibilityContextType = {
    settings,
    textToSpeech,
    updateSettings,
    speak,
    stopSpeaking,
    isSpeaking,
    isSupported
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export default AccessibilityProvider;