import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense
import matplotlib.pyplot as plt

# ขนาดของภาพ
img_width, img_height = 150, 150

# เตรียม Data Generators
train_datagen = ImageDataGenerator(rescale=1./255)
validation_datagen = ImageDataGenerator(rescale=1./255)

train_generator = train_datagen.flow_from_directory(
    'datasets/train',
    target_size=(img_width, img_height),
    batch_size=32,
    class_mode='binary')

validation_generator = validation_datagen.flow_from_directory(
    'datasets/validation',
    target_size=(img_width, img_height),
    batch_size=32,
    class_mode='binary')

# สร้าง Neural Network (CNN)
model = Sequential([
    Conv2D(32, (3,3), activation='relu', input_shape=(img_width, img_height, 3)),
    MaxPooling2D(2,2),

    Conv2D(64, (3,3), activation='relu'),
    MaxPooling2D(2,2),

    Conv2D(128, (3,3), activation='relu'),
    MaxPooling2D(2,2),

    Flatten(),
    Dense(512, activation='relu'),
    Dense(1, activation='sigmoid')
])

# คอมไพล์โมเดล
model.compile(loss='binary_crossentropy',
              optimizer='adam',
              metrics=['accuracy'])

# เทรนโมเดล
history = model.fit(
    train_generator,
    epochs=10,
    validation_data=validation_generator)

# บันทึกโมเดล
model.save('model_cats_dogs.keras')

# แสดงความแม่นยำ
plt.plot(history.history['accuracy'], label='Accuracy')
plt.plot(history.history['val_accuracy'], label='Validation Accuracy')
plt.legend()
plt.show()
