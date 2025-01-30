import React, { useState, useEffect } from "react";
import { View, Text, Animated } from "react-native";

const BreathingExercise = ({ stressLevel }) => {
  const [instruction, setInstruction] = useState("Breathe In...");
  const scaleAnim = useState(new Animated.Value(1))[0];

  useEffect(() => {
    const cycle = () => {
      setInstruction("Breathe In...");
      Animated.timing(scaleAnim, {
        toValue: 1.5,
        duration: 4000,
        useNativeDriver: true,
      }).start(() => {
        setInstruction("Hold...");
        setTimeout(() => {
          setInstruction("Breathe Out...");
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: true,
          }).start(() => {
            cycle();
          });
        }, 2000);
      });
    };
    cycle();
  }, []);

  return (
    <View style={{ alignItems: "center", marginTop: 20 }}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>{instruction}</Text>
      </Animated.View>
      <Text style={{ fontSize: 18, marginTop: 10 }}>Stress Level: {stressLevel}</Text>
    </View>
  );
};

export default BreathingExercise;
