import React, { useState, useEffect } from "react";
import { View, Text, Animated,StyleSheet } from "react-native";
import { useAppContext } from './AppContext';

const BreathingExercise = ({ stressLevel }) => {
   const {isMeasuring ,setIsMeasuring,captureCount, setCaptureCount} = useAppContext();
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
    <View>
      <View style={{ alignItems: "center", marginTop: 15 }}>
        {(stressLevel === "Mild Stress 😕" || stressLevel === "High Stress 😰") && 
          <Animated.View style={{ transform: [{ scale: scaleAnim }], marginBottom: 10 }}>
            <Text style={styles.animText}>{instruction}</Text>
          </Animated.View>
        }
        
      </View>
      {!isMeasuring && (
      <View style={{ flexDirection: 'row', width: '100%' }}>
        <Text style={styles.stressText}>Stress Level: {stressLevel}</Text>
      </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  animText:{
    fontSize: 20, 
    fontWeight: "bold",
    color:'#ffffff',
  },
  stressText:{
    fontSize: 15,
    fontWeight:'normal',
    color:'#ffffff',
    marginTop: 10,
    textAlign: 'left',
    flex:1,
  }
})

export default BreathingExercise;
