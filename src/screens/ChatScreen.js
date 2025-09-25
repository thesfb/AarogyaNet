import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
import { COLORS } from '../styles/colors';

// --- IMPORTANT ---
// Replace this with your ngrok URL or your computer's local IP address.
const API_URL = 'https://unravaged-kristan-unconventionally.ngrok-free.dev';

export default function ChatScreen({ route }) {
  const { diagnosis } = route.params;
  const [messages, setMessages] = useState([
    { id: '1', text: `You can now ask questions about "${diagnosis}". I am AarogyaNet, your AI health assistant. How can I help you?`, sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/chat/conversation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          diagnosis: diagnosis,
          language: 'English' // You can change this to 'Hindi', 'Tamil', etc.
        })
      });

      if (!response.ok) throw new Error('Failed to get a response from the server.');

      const data = await response.json();
      const botMessage = { id: Date.now().toString() + 'b', text: data.reply, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage = { id: Date.now().toString() + 'e', text: 'Sorry, I am having trouble connecting. Please try again later.', sender: 'bot' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={90}
      >
        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={[styles.messageBubble, item.sender === 'user' ? styles.userBubble : styles.botBubble]}>
              <Text style={item.sender === 'user' ? styles.userText : styles.botText}>{item.text}</Text>
            </View>
          )}
          inverted // Flips the list to show newest messages at the bottom
        />
        {isLoading && <ActivityIndicator style={{ margin: 10 }} color={COLORS.primary} />}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Ask a question..."
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton} disabled={isLoading}>
            <Icon name="send" type="feather" color="#FFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    keyboardAvoidingView: { flex: 1 },
    messageBubble: { padding: 15, borderRadius: 20, marginVertical: 5, marginHorizontal: 10, maxWidth: '80%' },
    userBubble: { backgroundColor: COLORS.primary, alignSelf: 'flex-end' },
    botBubble: { backgroundColor: COLORS.surface, alignSelf: 'flex-start', borderWidth: 1, borderColor: COLORS.border },
    userText: { color: '#FFF', fontSize: 16 },
    botText: { color: COLORS.text, fontSize: 16 },
    inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 10, borderTopWidth: 1, borderColor: COLORS.border, backgroundColor: COLORS.surface },
    input: { flex: 1, height: 40, backgroundColor: COLORS.background, borderRadius: 20, paddingHorizontal: 15, marginRight: 10 },
    sendButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' }
});