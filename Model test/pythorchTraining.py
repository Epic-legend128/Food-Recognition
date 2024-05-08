import os
import torch
from PIL import Image
from torchvision import transforms
import json

class CustomDataset(torch.utils.data.Dataset):
    def __init__(self, root, annotation_file, transforms=None):
        self.root = root
        self.transforms = transforms
        with open(annotation_file) as f:
            self.annotations = json.load(f)

    def __getitem__(self, idx):
        # Load the image
        image_id = self.annotations['images'][idx]['id']
        img_path = os.path.join(self.root, self.annotations['images'][idx]['file_name'])
        img = Image.open(img_path).convert("RGB")

        # Load annotations for the image
        annotations = [a for a in self.annotations['annotations'] if a['image_id'] == image_id]
        boxes = [a['bbox'] for a in annotations]
        labels = [a['category_id'] for a in annotations]

        # Convert boxes to tensors
        boxes = torch.as_tensor(boxes, dtype=torch.float32)
        labels = torch.as_tensor(labels, dtype=torch.int64)
        target = {"boxes": boxes, "labels": labels}

        if self.transforms is not None:
            img = self.transforms(img)

        return img, target

    def __len__(self):
        return len(self.annotations['images'])


import torch
from torch.utils.data import DataLoader

# Assuming dataset and annotations are located in specified paths
dataset = CustomDataset(root='path/to/images', annotation_file='path/to/annotations.json',
                        transforms=transforms.ToTensor())

dataloader = DataLoader(dataset, batch_size=4, shuffle=True, num_workers=2)


import torch.optim as optim
from torchvision.models.detection import FasterRCNN

# Define optimizer and model parameters
params = [p for p in model.parameters() if p.requires_grad]
optimizer = optim.SGD(params, lr=0.005, momentum=0.9, weight_decay=0.0005)

# Training loop
num_epochs = 5
model.train()

for epoch in range(num_epochs):
    for images, targets in dataloader:
        images = [image.to(device) for image in images]
        targets = [{k: v.to(device) for k, v in t.items()} for t in targets]

        # Zero gradients
        optimizer.zero_grad()

        # Forward pass and calculate loss
        loss_dict = model(images, targets)
        losses = sum(loss for loss in loss_dict.values())

        # Backpropagation
        losses.backward()
        optimizer.step()

    print(f"Epoch {epoch + 1} complete. Loss: {losses.item()}")


# Save the model
torch.save(model.state_dict(), 'faster_rcnn_model.pth')

# Load for inference
model.load_state_dict(torch.load('faster_rcnn_model.pth'))
model.eval()
