import librosa
import numpy as np
from keras.models import load_model
import os

# 음성 파일 불러오기 및 MFCC 특성 추출 함수
def load_and_preprocess_audio(audio_file_path):
    # 음성 파일 불러오기
    audio_data, sr = librosa.load(audio_file_path, sr=None)

    # MFCC 특성 추출 (n_fft와 hop_length 조정)
    mfccs = librosa.feature.mfcc(y=audio_data, sr=sr, n_mfcc=13, n_fft=512, hop_length=256)

    # 특성 벡터 크기를 모델의 입력 크기와 일치하도록 조정
    target_shape = (13, 136)  # 목표 형태
    if mfccs.shape[1] < target_shape[1]:
        # 현재 프레임 수가 부족한 경우 패딩
        pad_width = target_shape[1] - mfccs.shape[1]
        mfccs = np.pad(mfccs, pad_width=((0, 0), (0, pad_width)))

    # 만약 MFCC 특성이 크기 (13, 517) 등으로 큰 경우, 자르기
    if mfccs.shape[1] > target_shape[1]:
        mfccs = mfccs[:, :target_shape[1]]

    mfccs = np.expand_dims(mfccs, axis=-1)  # 차원을 마지막에 추가하여 (None, 13, 136, 1) 형태로 변환

    return mfccs

# 분류 함수 정의
def predict_audio(audio_file_path, model):
    preprocessed_audio = load_and_preprocess_audio(audio_file_path)
    preprocessed_audio = np.expand_dims(preprocessed_audio, axis=0)  # 배치 차원 추가
    prediction = model.predict(preprocessed_audio)
    predicted_class = np.argmax(prediction)  # 위급상황(1) 또는 환경소음(0) 중 하나를 선택

    if predicted_class == 1:
        return "위급상황입니다."
    else:
        return "환경소음입니다."

# 모델 경로 설정
model_dir = "./model"
model_filename = "model.h5"
model_path = os.path.join(model_dir, model_filename)

print("model path 경로: ",model_path)

# 모델 파일이 존재하는지 확인
print(os.path.exists(model_path))

# 모델 파일 이름 출력
print(os.listdir(model_dir))

# 모델 로드
loaded_model = load_model(model_path)

# 분류할 음성 파일 경로 설정
audio_dir = "./temp"
audio_filename = "record.wav"
audio_file_path = os.path.join(audio_dir, audio_filename)

# 결과 출력
result = predict_audio(audio_file_path, loaded_model)
print(result)