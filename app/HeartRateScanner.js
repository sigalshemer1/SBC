import React, { useState, useEffect, useRef } from "react";
import { View, Text, Button, StyleSheet,TouchableOpacity,Image } from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useAppContext } from './AppContext';

const HeartRateScanner = ({ onHeartRateDetected }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [heartRate, setHeartRate] = useState(null);
  const [processing, setProcessing] = useState(false);
  // const [captureCount, setCaptureCount] = useState(0);
  const cameraRef = useRef(null);
  const frameBuffer = useRef([]);
  const captureInterval = useRef(null);  // Track the interval for automatic captures
  const {isMeasuring ,setIsMeasuring,captureCount, setCaptureCount} = useAppContext();

  useEffect(() => {
    if (!permission) return;
    if (!permission.granted) requestPermission();
  }, [permission]);

  useEffect(() => {
    if (captureCount >= 10) {
      setIsMeasuring(false);
      clearInterval(captureInterval.current);  // Stop the automatic capturing process
      return;
    }
  }, [captureCount]);


  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button  onPress={() => {
            requestPermission().then(() => {
            }).catch((error) => {
              console.error("Error requesting permission:", error);
            });
          }} title="Grant permission" />
      </View>
    );
  }

  const processFrame = async () => {
    if (!cameraRef.current || processing) {
      console.log("Camera not ready or processing already running");
      return;
    }

    setProcessing(true);

    try {
      const frame = await cameraRef.current.takePictureAsync({ base64: true });

      if (!frame || !frame.base64) {
        setProcessing(false);
        return;
      }

      // Extract red channel intensity
      const avgRed = extractRedIntensity(frame.base64);

      // Store last 10 values for heart rate calculation
      frameBuffer.current.push(avgRed);
      if (frameBuffer.current.length > 10) frameBuffer.current.shift();

      // Calculate heart rate
      if (frameBuffer.current.length === 10) {
        const detectedHeartRate = calculateHeartRate(frameBuffer.current);

        setHeartRate(detectedHeartRate);
        onHeartRateDetected(detectedHeartRate);
      }
      // Update capture count
      setCaptureCount(prevCount => prevCount + 1);

    } catch (error) {
      console.error("❌ Error processing frame:", error);
    }

    setProcessing(false);
  };

  /** Extract red color intensity from image */
  const extractRedIntensity = (base64Image) => {
    let totalRed = 0;
    let count = 0;

    // Decode base64 image manually (simulate pixel processing)
    for (let i = 0; i < base64Image.length; i += 4) {
      totalRed += base64Image.charCodeAt(i); // Red channel
      count++;
    }

    return totalRed / count; // Average red intensity
  };

  /** Estimate heart rate from red intensity variations */
  const calculateHeartRate = (values) => {
    const variations = values.map((v, i, arr) => (i > 0 ? v - arr[i - 1] : 0));
    const peakCount = variations.filter((v) => v > 5).length;
    return Math.floor(peakCount * 6); // Convert to BPM
  };

  const handleStartMeasuring = () => {
    setCaptureCount(0); // Reset the counter
    setIsMeasuring(true);
    setHeartRate(null); // Clear previous heart rate
    frameBuffer.current = []; // Reset frame buffer

    // Start the automatic frame capturing every 500ms (you can adjust the interval)
    captureInterval.current = setInterval(() => {
      processFrame();
    }, 700); 
  };

  const handleRest = () => {
    setCaptureCount(0); // Reset the counter
    setIsMeasuring(false); // Stop measuring
    setHeartRate(null); // Clear heart rate
    frameBuffer.current = []; // Clear frame buffer
    clearInterval(captureInterval.current); // Stop automatic capturing
  };

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing="front" />
      {isMeasuring ? (
        <View>
          <Text style={styles.countdownText}>Just {10 - captureCount} more</Text>
        </View>
      ) : (
        <TouchableOpacity onPress={handleStartMeasuring}>
          <Image source={require('../assets/images/camera.png')} style={styles.cameraIcon} />
        </TouchableOpacity>
      )}

      {captureCount >= 10 && (
        <View>
          <Text style={styles.heartRateText}>Heart Rate: {heartRate} BPM</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  countdownText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    marginTop:-35,
    marginLeft:10,
  },
  heartRateText: {
    fontSize: 15,
    color: 'white',
    marginTop:10,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
  },
  cameraIcon:{
    width: 50,
    height: 50,
    position: 'absolute',
    bottom: 10, 
    left: 10, 
    zIndex: 1,
  }
});

export default HeartRateScanner;
