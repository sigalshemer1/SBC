import { Image, Alert, StyleSheet, SafeAreaView, TouchableOpacity, Button, ScrollView, View, Text, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import HeartRateScanner from "./HeartRateScanner";
import BreathingExercise from "./BreathingExercise";

export default function HomeScreen() {
  const [stressLevel, setStressLevel] = useState<string | null>(null); // TypeScript type for state

  const analyzeStressLevel = (heartRate) => {
    if (heartRate < 60) return "Relaxed 😌";
    if (heartRate >= 60 && heartRate < 80) return "Normal 🧘‍♂️";
    if (heartRate >= 80 && heartRate < 100) return "Mild Stress 😕";
    return "High Stress 😰";
  };

   const handleHeartRateDetected = (heartRate: number) => {
    console.log("Heart Rate");
    const detectedStress = analyzeStressLevel(heartRate);
   setStressLevel(detectedStress); 
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Smart Breathing Coach</Text>
      <HeartRateScanner onHeartRateDetected={handleHeartRateDetected} />
      {stressLevel && <BreathingExercise stressLevel={stressLevel} />}
    </View>
  );
}

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0B2660',
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: '#F3EFF0',
  },
  scrollView: {
    flexGrow: 1,
  },
  mainTitle: {
    color: '#FFE08A',
    fontSize: 24,
    fontWeight: 'bold',
  },
  loadingText: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  inputWrap: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 7,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 6,
    paddingHorizontal: 10,
  },
  customButton: {
    backgroundColor: '#bf4da2',
    paddingVertical: 12,
    marginBottom: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
