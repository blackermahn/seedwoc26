# Chapter 11, Module 3: Recurrent Neural Networks and Sequence Models

## Module Overview
This module covers recurrent neural networks (RNNs) and their applications to sequential data such as text, time series, and audio. Students will learn about different RNN architectures including basic RNNs, LSTMs, and GRUs, understanding how they maintain temporal context. The module includes sequence-to-sequence models, attention mechanisms, and practical applications in natural language processing and time series forecasting.

## Learning Outcomes
Students will be able to:
- Understand recurrent connections and how RNNs process sequences
- Implement and train basic RNNs, LSTMs, and GRUs
- Handle variable-length sequences with masking and padding
- Build encoder-decoder architectures for sequence-to-sequence tasks
- Implement attention mechanisms for improved sequence modeling
- Train models for language modeling, machine translation, and time series prediction
- Debug training issues specific to sequential models (vanishing gradients)

## Curriculum Outline

### Part 1: RNN Fundamentals
- Duration: 8 hours
- Topics:
  - Recurrent connections and temporal unfolding
  - Forward and backpropagation through time (BPTT)
  - Vanishing and exploding gradient problems
  - Basic RNN architecture
  - Training strategies for RNNs
  - Sequence representation and encoding

### Part 2: LSTM and GRU Architectures
- Duration: 8 hours
- Topics:
  - Long Short-Term Memory (LSTM) cells and gates
  - GRU (Gated Recurrent Unit) architecture
  - Comparing LSTM, GRU, and vanilla RNN
  - Bidirectional RNNs for sequence context
  - Multi-layer RNNs and stacking
  - Handling long sequences and gradient flow

### Part 3: Sequence-to-Sequence Models and Attention
- Duration: 8 hours
- Topics:
  - Encoder-decoder architectures
  - Sequence-to-sequence learning
  - Introduction to attention mechanisms
  - Self-attention and multi-head attention
  - Attention in machine translation
  - Visual attention for image captioning
  - Transformer architecture overview

### Part 4: Applications and Practice
- Duration: 6 hours
- Topics:
  - Language modeling and text generation
  - Machine translation with neural models
  - Time series forecasting with RNNs
  - Sentiment analysis and text classification
  - Named entity recognition (NER)
  - Speech recognition basics
  - Practical deployment considerations

## Duration
Approximately 30 hours of instruction and hands-on practice

## Prerequisites
- Chapter 11, Module 1: Deep Learning and Neural Networks Fundamentals
- Comfort with matrix operations and calculus
- Understanding of embeddings and word representations
- Experience with sequence processing

## Assignments

### Assignment 1: Text Generation with LSTM (16 hours)
Build a character-level or word-level language model using LSTM. Train on a text corpus (Shakespeare, Python code, or similar), generate text by sampling from the model, and evaluate text quality. Compare vanilla RNN vs. LSTM performance on the same task.

### Assignment 2: Sentiment Analysis with RNN (14 hours)
Implement sentiment analysis using word embeddings and bidirectional LSTM. Train on a movie review or product review dataset. Achieve competitive accuracy and analyze what patterns the model learns. Include visualization of learned representations.

### Assignment 3: Time Series Forecasting (16 hours)
Use LSTM or GRU to forecast a time series (stock prices, weather, energy consumption). Implement sliding window data preparation, train the model, and evaluate forecasts using appropriate metrics (MAE, RMSE). Compare with baseline models and document improvements.

### Assignment 4: Sequence-to-Sequence Project (18 hours)
Build a sequence-to-sequence model for machine translation (English to French) or abstractive summarization. Implement encoder-decoder with attention mechanism. Train on appropriate dataset and evaluate translation/summary quality. Include attention visualization showing which source words are attended to.

## Pro Tips
- LSTM and GRU mostly solve the vanishing gradient problem - prefer them over vanilla RNNs unless you have a specific reason
- GRU has fewer parameters than LSTM - good choice when training data is limited
- Bidirectional RNNs see both past and future context - perfect for tagging tasks, but not for real-time prediction
- Use masking when sequences have variable lengths - prevents padding tokens from affecting gradients
- Embedding layers before RNNs significantly reduce parameters and improve training speed for text data
- Gradient clipping is essential for RNN training - prevents exploding gradients (try clip_norm=1.0)
- Stateful RNNs are subtle and usually not necessary - stateless with careful sequence preparation is cleaner
- Attention mechanisms dramatically improve sequence-to-sequence performance - worth the implementation complexity
- Teacher forcing (using ground truth tokens during training) can cause exposure bias - try curriculum learning if inference quality is poor
- Layer normalization often works better than batch normalization for RNNs - try it if training is unstable
- Monitor gradient norms during training - healthy RNNs have stable, non-exploding gradients
- For long sequences (100+ timesteps), use memory-efficient implementations like TensorFlow's CuDNNLSTM
