# Chapter 11, Module 2: Convolutional Neural Networks

## Module Overview
This module focuses on convolutional neural networks (CNNs) and their applications to image processing and computer vision tasks. Students will learn the architecture of CNNs, including convolutional layers, pooling, and fully connected layers. The module covers both building custom CNNs from scratch and leveraging pre-trained models through transfer learning.

## Learning Outcomes
Students will be able to:
- Understand convolutional layers, feature maps, and receptive fields
- Design and implement custom CNN architectures for specific tasks
- Apply pooling and regularization techniques to prevent overfitting
- Implement classic architectures (LeNet, AlexNet, VGG, ResNet)
- Use transfer learning with pre-trained models for efficient learning
- Process, augment, and prepare image data for training
- Achieve state-of-the-art results on image classification tasks

## Curriculum Outline

### Part 1: CNN Fundamentals and Architecture
- Duration: 8 hours
- Topics:
  - Convolution operation and feature detection
  - Convolutional layers architecture and parameters
  - Receptive fields and spatial hierarchy
  - Pooling operations (max, average, stride)
  - Flattening and fully connected layers
  - Introduction to classic architectures (LeNet, AlexNet)

### Part 2: Advanced CNN Architectures
- Duration: 8 hours
- Topics:
  - VGG networks and very deep architectures
  - Inception modules and GoogleNet
  - Residual networks (ResNet) and skip connections
  - Batch normalization and training deep networks
  - Depthwise separable convolutions
  - Efficient architectures (MobileNet, EfficientNet)

### Part 3: Transfer Learning and Fine-tuning
- Duration: 6 hours
- Topics:
  - Pre-trained models and ImageNet weights
  - Fine-tuning strategies and layer freezing
  - Feature extraction vs. end-to-end fine-tuning
  - Domain adaptation techniques
  - Working with limited data through transfer learning
  - Model zoos and available pre-trained weights

### Part 4: Image Data Handling and Augmentation
- Duration: 6 hours
- Topics:
  - Loading and preprocessing image data
  - Data augmentation strategies and techniques
  - Handling class imbalance in image datasets
  - Dataset pipeline optimization (tf.data API)
  - Visualization of learned features
  - Debugging model performance on images

## Duration
Approximately 28 hours of instruction and hands-on practice

## Prerequisites
- Chapter 11, Module 1: Deep Learning and Neural Networks Fundamentals
- Understanding of matrix operations and calculus
- Experience with deep learning frameworks (TensorFlow/PyTorch)

## Assignments

### Assignment 1: CIFAR-10 Classification from Scratch (18 hours)
Build a custom CNN architecture for CIFAR-10 image classification. Implement convolution and pooling layers manually, train without pre-trained weights, and achieve target accuracy. Include visualizations of learned filters and feature maps at different layers.

### Assignment 2: Transfer Learning for Custom Dataset (16 hours)
Choose a custom image classification problem (cats vs. dogs, plant disease detection, or similar). Use a pre-trained model (ResNet, VGG, EfficientNet), fine-tune for your dataset, and compare performance with and without transfer learning. Document computational savings and accuracy improvements.

### Assignment 3: Image Augmentation Study (12 hours)
Implement and compare different augmentation strategies (rotation, flipping, color jittering, etc.) on a dataset with limited samples. Measure the impact on model generalization. Create visualizations showing augmented samples and learning curves comparing augmented vs. non-augmented training.

### Assignment 4: Multi-class Image Classification Project (20 hours)
Build an end-to-end image classification system for a real-world problem with 5+ classes. Include data pipeline, augmentation, model architecture selection, training, validation, and inference. Deploy as a simple web service or API that accepts image uploads.

## Pro Tips
- Convolutional layers automatically learn spatial features - don't hand-engineer them
- Smaller kernels (3x3) stacked are often better than large kernels (7x7) - more nonlinearity, fewer parameters
- Max pooling is more common than average pooling and works well in practice
- ReLU activation is standard in modern CNNs - use it unless you have a specific reason not to
- Data augmentation is critical when training from scratch - it's nearly as important as the architecture
- Transfer learning from ImageNet is powerful for most vision tasks - always try it first
- Freeze early layers (general features) and fine-tune later layers (task-specific) for best results
- Batch normalization dramatically improves training stability and allows higher learning rates
- Skip connections (ResNet-style) help with very deep networks - add them if depth exceeds 50 layers
- Always visualize misclassified examples - they reveal what the model struggles with
- Watch your training/validation curves for signs of overfitting - early stopping saves training time
- Monitor GPU memory usage - use smaller batch sizes if you hit memory limits
