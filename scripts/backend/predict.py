import os
import random
import math
from datetime import datetime
from collections import Counter
import pandas as pd
import numpy as np

import cv2
from PIL import Image
from pathlib import Path
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle
from sklearn.model_selection import train_test_split
import xml.etree.ElementTree as ET

import torch
from torch.utils.data import Dataset, DataLoader
import torch.optim as optim
import torch.nn as nn
import torch.nn.functional as F
from torchvision import models

class BB_model(nn.Module):
    def __init__(self):
        super(BB_model, self).__init__()
        resnet = models.resnet34(pretrained=True)
        layers = list(resnet.children())[:8]
        self.features1 = nn.Sequential(*layers[:6])
        self.features2 = nn.Sequential(*layers[6:])
        self.classifier = nn.Sequential(nn.BatchNorm1d(512), nn.Linear(512, 14))
        self.bb = nn.Sequential(nn.BatchNorm1d(512), nn.Linear(512, 4))
        
    def forward(self, x):
        x = self.features1(x)
        x = self.features2(x)
        x = F.relu(x)
        x = nn.AdaptiveAvgPool2d((1,1))(x)
        x = x.view(x.shape[0], -1)
        return self.classifier(x), self.bb(x)

class_dict = {'Apple 0%': 0, 'Apple 25%': 1, 'Apple 50%': 2, 'Apple 75%': 3, 'Apple 100%': 4, 'Bread 25%': 5, 'Bread 50%':6, 'Bread 75%':7, 'Bread 85%':8, 'Bread 100%':9, 'Pasta 25%':10, 'Pasta 50%':11, 'Pasta 75%':12, 'Pasta 100%':13}

model = BB_model()
model.load_state_dict(torch.load('./model.pth'))
model.eval()

def read_image(path):
    return cv2.cvtColor(cv2.imread(str(path)), cv2.COLOR_BGR2RGB)

def resize_image(read_path,write_path='out/',sz=300):
    im = read_image(read_path)
    im_resized = cv2.resize(im, (int(1.49*sz), sz))
    new_path = str('out/prediction.png')
    cv2.imwrite(new_path, cv2.cvtColor(im_resized, cv2.COLOR_RGB2BGR))
    return new_path

def normalize(im):
    imagenet_stats = np.array([[0.485, 0.456, 0.406], [0.229, 0.224, 0.225]])
    return (im - imagenet_stats[0])/imagenet_stats[1]

def predict(path):
    path = resize_image(path)
    im = read_image(path)
    im = cv2.resize(im, (int(1.49*300), 300))

    cv2.imwrite(path, cv2.cvtColor(im, cv2.COLOR_RGB2BGR))

    x = cv2.imread(str(path)).astype(np.float32)
    x = cv2.cvtColor(x, cv2.COLOR_BGR2RGB)/255

    x = normalize(x)
    x = np.rollaxis(x, 2)

    xx = torch.FloatTensor(x[None,])

    model.load_state_dict(torch.load('./model.pth'))
    model.eval()

    out_class, out_bb = model(xx)

    out_class = out_class.detach().cpu().numpy() 

    json_string = {}

    for j,i in enumerate(out_class[0]):
        json_string.update({list(class_dict.items())[j][0]: i})

    out_bb = out_bb.detach().cpu().numpy()
    out_bb = out_bb.astype(int)

    return json_string, out_bb

print(predict("inp/inp.png"))