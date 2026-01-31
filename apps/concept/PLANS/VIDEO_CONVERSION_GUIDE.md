# Video Conversion Guide for Hero Section

Complete step-by-step instructions to convert your video to web-optimized formats with target file sizes.

---

## Prerequisites

### Option 1: Docker (Recommended - No Local Installation)

**Benefits:**
- No need to install FFmpeg locally
- Consistent environment across all platforms
- Easy to share with team members
- Works on Windows, Mac, and Linux

**Step 1: Install Docker**
- Windows/Mac: https://www.docker.com/products/docker-desktop
- Linux: `sudo apt install docker.io` (Ubuntu/Debian)

**Step 2: Pull FFmpeg Image**
```bash
docker pull jrottenberg/ffmpeg:latest
```

**Step 3: Create Conversion Script**

Create `docker-convert.sh` (Mac/Linux):
```bash
#!/bin/bash

if [ -z "$1" ]; then
  echo "Usage: ./docker-convert.sh input.mp4"
  exit 1
fi

INPUT="$1"
BASENAME=$(basename "$INPUT" .mp4)
INPUT_DIR=$(dirname "$INPUT")

echo "Converting $INPUT using Docker..."

# 480p WebM
echo "Creating 480p WebM..."
docker run --rm \
  -v "$(pwd)/$INPUT_DIR:/input" \
  -v "$(pwd)/output:/output" \
  jrottenberg/ffmpeg:latest \
  -i "/input/$(basename $INPUT)" \
  -c:v libvpx-vp9 \
  -b:v 800k \
  -minrate 500k \
  -maxrate 1000k \
  -crf 35 \
  -vf "scale=-1:480,format=yuv420p" \
  -deadline good \
  -cpu-used 2 \
  -an \
  "/output/${BASENAME}-480p.webm"

# 720p WebM
echo "Creating 720p WebM..."
docker run --rm \
  -v "$(pwd)/$INPUT_DIR:/input" \
  -v "$(pwd)/output:/output" \
  jrottenberg/ffmpeg:latest \
  -i "/input/$(basename $INPUT)" \
  -c:v libvpx-vp9 \
  -b:v 2500k \
  -minrate 1500k \
  -maxrate 3000k \
  -crf 30 \
  -vf "scale=-1:720,format=yuv420p" \
  -deadline good \
  -cpu-used 2 \
  -an \
  "/output/${BASENAME}-720p.webm"

# 480p MP4
echo "Creating 480p MP4..."
docker run --rm \
  -v "$(pwd)/$INPUT_DIR:/input" \
  -v "$(pwd)/output:/output" \
  jrottenberg/ffmpeg:latest \
  -i "/input/$(basename $INPUT)" \
  -c:v libx264 \
  -preset slow \
  -crf 28 \
  -vf "scale=-1:480,format=yuv420p" \
  -movflags +faststart \
  -an \
  "/output/${BASENAME}-480p.mp4"

# 720p MP4
echo "Creating 720p MP4..."
docker run --rm \
  -v "$(pwd)/$INPUT_DIR:/input" \
  -v "$(pwd)/output:/output" \
  jrottenberg/ffmpeg:latest \
  -i "/input/$(basename $INPUT)" \
  -c:v libx264 \
  -preset slow \
  -crf 23 \
  -vf "scale=-1:720,format=yuv420p" \
  -movflags +faststart \
  -an \
  "/output/${BASENAME}-720p.mp4"

# Poster
echo "Creating poster image..."
docker run --rm \
  -v "$(pwd)/$INPUT_DIR:/input" \
  -v "$(pwd)/output:/output" \
  jrottenberg/ffmpeg:latest \
  -i "/input/$(basename $INPUT)" \
  -ss 00:00:02 \
  -vframes 1 \
  -q:v 3 \
  -vf "scale=1280:-1" \
  "/output/${BASENAME}-poster.jpg"

echo "Done! Check the output/ folder"
ls -lh output/
```

Create `docker-convert.bat` (Windows):
```batch
@echo off
setlocal enabledelayedexpansion

if "%~1"=="" (
  echo Usage: docker-convert.bat input.mp4
  exit /b 1
)

set "INPUT=%~1"
set "BASENAME=%~n1"
set "INPUT_DIR=%~dp1"

echo Converting %INPUT% using Docker...

if not exist output mkdir output

REM 480p WebM
echo Creating 480p WebM...
docker run --rm ^
  -v "%INPUT_DIR%:/input" ^
  -v "%CD%\output:/output" ^
  jrottenberg/ffmpeg:latest ^
  -i "/input/%~nx1" ^
  -c:v libvpx-vp9 ^
  -b:v 800k ^
  -minrate 500k ^
  -maxrate 1000k ^
  -crf 35 ^
  -vf "scale=-1:480,format=yuv420p" ^
  -deadline good ^
  -cpu-used 2 ^
  -an ^
  "/output/%BASENAME%-480p.webm"

REM 720p WebM
echo Creating 720p WebM...
docker run --rm ^
  -v "%INPUT_DIR%:/input" ^
  -v "%CD%\output:/output" ^
  jrottenberg/ffmpeg:latest ^
  -i "/input/%~nx1" ^
  -c:v libvpx-vp9 ^
  -b:v 2500k ^
  -minrate 1500k ^
  -maxrate 3000k ^
  -crf 30 ^
  -vf "scale=-1:720,format=yuv420p" ^
  -deadline good ^
  -cpu-used 2 ^
  -an ^
  "/output/%BASENAME%-720p.webm"

REM 480p MP4
echo Creating 480p MP4...
docker run --rm ^
  -v "%INPUT_DIR%:/input" ^
  -v "%CD%\output:/output" ^
  jrottenberg/ffmpeg:latest ^
  -i "/input/%~nx1" ^
  -c:v libx264 ^
  -preset slow ^
  -crf 28 ^
  -vf "scale=-1:480,format=yuv420p" ^
  -movflags +faststart ^
  -an ^
  "/output/%BASENAME%-480p.mp4"

REM 720p MP4
echo Creating 720p MP4...
docker run --rm ^
  -v "%INPUT_DIR%:/input" ^
  -v "%CD%\output:/output" ^
  jrottenberg/ffmpeg:latest ^
  -i "/input/%~nx1" ^
  -c:v libx264 ^
  -preset slow ^
  -crf 23 ^
  -vf "scale=-1:720,format=yuv420p" ^
  -movflags +faststart ^
  -an ^
  "/output/%BASENAME%-720p.mp4"

REM Poster
echo Creating poster image...
docker run --rm ^
  -v "%INPUT_DIR%:/input" ^
  -v "%CD%\output:/output" ^
  jrottenberg/ffmpeg:latest ^
  -i "/input/%~nx1" ^
  -ss 00:00:02 ^
  -vframes 1 ^
  -q:v 3 ^
  -vf "scale=1280:-1" ^
  "/output/%BASENAME%-poster.jpg"

echo Done! Check the output folder
dir output\

pause
```

**Usage:**
```bash
# Mac/Linux
chmod +x docker-convert.sh
./docker-convert.sh my-video.mp4

# Windows
docker-convert.bat my-video.mp4
```

**Docker One-Liner (Quick Convert):**
```bash
# 480p WebM
docker run --rm -v $(pwd):/input jrottenberg/ffmpeg:latest -i /input/my-video.mp4 -c:v libvpx-vp9 -b:v 800k -crf 35 -vf "scale=-1:480" -an /input/hero-480p.webm

# 720p WebM
docker run --rm -v $(pwd):/input jrottenberg/ffmpeg:latest -i /input/my-video.mp4 -c:v libvpx-vp9 -b:v 2500k -crf 30 -vf "scale=-1:720" -an /input/hero-720p.webm

# Poster
docker run --rm -v $(pwd):/input jrottenberg/ffmpeg:latest -i /input/my-video.mp4 -ss 2 -vframes 1 -q:v 3 /input/hero-poster.jpg
```

### Option 2: Install FFmpeg Locally

**Windows (PowerShell):**
```powershell
# Using winget
winget install Gyan.FFmpeg

# Or download from https://ffmpeg.org/download.html
```

**Mac:**
```bash
brew install ffmpeg
```

**Linux:**
```bash
sudo apt update
sudo apt install ffmpeg
```

### Option 3: Online Tools (No Installation)
- **CloudConvert**: https://cloudconvert.com/webm-converter
- **Convertio**: https://convertio.co/video-converter/
- **FreeConvert**: https://www.freeconvert.com/webm-converter

---

## Target Specifications

| Format | Resolution | Bitrate | Duration | Target Size | Use Case |
|--------|------------|---------|----------|-------------|----------|
| WebM | 480p (854x480) | 800 kbps | 10 sec | ~1 MB | Mobile 4G |
| WebM | 720p (1280x720) | 2.5 Mbps | 10 sec | ~3 MB | Desktop/WiFi |
| JPG | - | High quality | - | ~100 KB | Poster/Thumbnail |

---

## Step 1: Prepare Your Source Video

**Ideal source characteristics:**
- Resolution: 1080p or higher
- Format: MP4, MOV, or AVI
- Duration: 10 seconds (loop seamlessly)
- No audio (or audio will be removed)

**If your video is longer than 10 seconds, trim it first:**

```bash
# Extract 10 seconds starting at 00:05
ffmpeg -i input.mp4 -ss 00:00:05 -t 10 -c copy trimmed.mp4
```

---

## Step 2: Convert to 480p WebM (~1MB)

### FFmpeg Command (Recommended)

```bash
ffmpeg -i input.mp4 \
  -c:v libvpx-vp9 \
  -b:v 800k \
  -minrate 500k \
  -maxrate 1000k \
  -crf 35 \
  -vf "scale=-1:480,format=yuv420p" \
  -deadline good \
  -cpu-used 2 \
  -an \
  -metadata title="Raiganj Hero Mobile" \
  hero-480p.webm
```

**Parameter explanations:**
- `-c:v libvpx-vp9` - Use VP9 codec (best compression)
- `-b:v 800k` - Target 800 kbps bitrate
- `-minrate 500k -maxrate 1000k` - Bitrate range
- `-crf 35` - Quality (0-63, higher = smaller file)
- `-vf "scale=-1:480"` - Scale to 480px height (maintains aspect ratio)
- `-deadline good` - Balance speed/quality
- `-cpu-used 2` - Faster encoding (0=best, 5=fastest)
- `-an` - Remove audio track (saves space)

### Alternative: Two-Pass for Better Quality

```bash
# First pass
ffmpeg -i input.mp4 \
  -c:v libvpx-vp9 \
  -b:v 800k \
  -vf "scale=-1:480" \
  -deadline good \
  -cpu-used 2 \
  -an \
  -pass 1 \
  -f null /dev/null

# Second pass (Windows: use NUL instead of /dev/null)
ffmpeg -i input.mp4 \
  -c:v libvpx-vp9 \
  -b:v 800k \
  -vf "scale=-1:480" \
  -deadline good \
  -cpu-used 2 \
  -an \
  -pass 2 \
  hero-480p.webm
```

---

## Step 3: Convert to 720p WebM (~3MB)

```bash
ffmpeg -i input.mp4 \
  -c:v libvpx-vp9 \
  -b:v 2500k \
  -minrate 1500k \
  -maxrate 3000k \
  -crf 30 \
  -vf "scale=-1:720,format=yuv420p" \
  -deadline good \
  -cpu-used 2 \
  -an \
  -metadata title="Raiganj Hero Desktop" \
  hero-720p.webm
```

---

## Step 4: Create MP4 Fallbacks

**480p MP4:**
```bash
ffmpeg -i input.mp4 \
  -c:v libx264 \
  -preset slow \
  -crf 28 \
  -vf "scale=-1:480,format=yuv420p" \
  -movflags +faststart \
  -an \
  hero-480p.mp4
```

**720p MP4:**
```bash
ffmpeg -i input.mp4 \
  -c:v libx264 \
  -preset slow \
  -crf 23 \
  -vf "scale=-1:720,format=yuv420p" \
  -movflags +faststart \
  -an \
  hero-720p.mp4
```

**MP4 parameters:**
- `-c:v libx264` - H.264 codec (universal support)
- `-preset slow` - Better compression (slower encoding)
- `-crf 23` - Quality (0-51, lower = better quality)
- `-movflags +faststart` - Enables progressive download

---

## Step 5: Create Poster Image (~100KB)

**Extract frame at 2 seconds:**
```bash
ffmpeg -i input.mp4 \
  -ss 00:00:02 \
  -vframes 1 \
  -q:v 2 \
  -vf "scale=1280:-1" \
  hero-poster.jpg
```

**Optimize for web (if file is too large):**
```bash
ffmpeg -i input.mp4 \
  -ss 00:00:02 \
  -vframes 1 \
  -q:v 5 \
  -vf "scale=1280:-1" \
  hero-poster.jpg
```

**Parameters:**
- `-ss 00:00:02` - Extract at 2 seconds
- `-vframes 1` - Extract only 1 frame
- `-q:v 2` - Quality (2-31, lower = better, 2-5 is good)
- `-vf "scale=1280:-1"` - Resize to 1280px width

### Alternative: Use ImageMagick for Poster

```bash
# If you have ImageMagick installed
convert input.mp4[2] -resize 1280x720 -quality 85 hero-poster.jpg
```

---

## Step 6: Batch Script (Windows)

Create `convert-video.bat`:

```batch
@echo off
echo Converting video for web...

set INPUT=%1
if "%INPUT%"=="" (
  echo Usage: convert-video.bat input.mp4
  exit /b 1
)

echo Creating 480p WebM...
ffmpeg -i "%INPUT%" -c:v libvpx-vp9 -b:v 800k -minrate 500k -maxrate 1000k -crf 35 -vf "scale=-1:480,format=yuv420p" -deadline good -cpu-used 2 -an hero-480p.webm

echo Creating 720p WebM...
ffmpeg -i "%INPUT%" -c:v libvpx-vp9 -b:v 2500k -minrate 1500k -maxrate 3000k -crf 30 -vf "scale=-1:720,format=yuv420p" -deadline good -cpu-used 2 -an hero-720p.webm

echo Creating 480p MP4...
ffmpeg -i "%INPUT%" -c:v libx264 -preset slow -crf 28 -vf "scale=-1:480,format=yuv420p" -movflags +faststart -an hero-480p.mp4

echo Creating 720p MP4...
ffmpeg -i "%INPUT%" -c:v libx264 -preset slow -crf 23 -vf "scale=-1:720,format=yuv420p" -movflags +faststart -an hero-720p.mp4

echo Creating poster image...
ffmpeg -i "%INPUT%" -ss 00:00:02 -vframes 1 -q:v 3 -vf "scale=1280:-1" hero-poster.jpg

echo Done!
echo.
dir hero-*

pause
```

**Usage:**
```batch
convert-video.bat my-video.mp4
```

---

## Step 7: Docker Compose (Easiest Method)

Create `docker-compose.yml`:
```yaml
version: '3.8'

services:
  video-convert:
    image: jrottenberg/ffmpeg:latest
    volumes:
      - ./input:/input
      - ./output:/output
    command: >
      bash -c "
        echo 'Converting videos...' &&
        ffmpeg -i /input/video.mp4 -c:v libvpx-vp9 -b:v 800k -minrate 500k -maxrate 1000k -crf 35 -vf 'scale=-1:480,format=yuv420p' -deadline good -cpu-used 2 -an /output/hero-480p.webm &&
        ffmpeg -i /input/video.mp4 -c:v libvpx-vp9 -b:v 2500k -minrate 1500k -maxrate 3000k -crf 30 -vf 'scale=-1:720,format=yuv420p' -deadline good -cpu-used 2 -an /output/hero-720p.webm &&
        ffmpeg -i /input/video.mp4 -c:v libx264 -preset slow -crf 28 -vf 'scale=-1:480,format=yuv420p' -movflags +faststart -an /output/hero-480p.mp4 &&
        ffmpeg -i /input/video.mp4 -c:v libx264 -preset slow -crf 23 -vf 'scale=-1:720,format=yuv420p' -movflags +faststart -an /output/hero-720p.mp4 &&
        ffmpeg -i /input/video.mp4 -ss 00:00:02 -vframes 1 -q:v 3 -vf 'scale=1280:-1' /output/hero-poster.jpg &&
        echo 'Done!'
      "
```

**Usage:**
```bash
# 1. Place your video in input/ folder as video.mp4
mkdir -p input output
cp my-video.mp4 input/video.mp4

# 2. Run conversion
docker-compose up

# 3. Check output folder
ls -lh output/
```

---

## Step 8: Bash Script (Mac/Linux)

Create `convert-video.sh`:

```bash
#!/bin/bash

if [ -z "$1" ]; then
  echo "Usage: ./convert-video.sh input.mp4"
  exit 1
fi

INPUT="$1"
BASENAME=$(basename "$INPUT" .mp4)

echo "Converting $INPUT for web..."

# 480p WebM
echo "Creating 480p WebM..."
ffmpeg -i "$INPUT" \
  -c:v libvpx-vp9 \
  -b:v 800k \
  -minrate 500k \
  -maxrate 1000k \
  -crf 35 \
  -vf "scale=-1:480,format=yuv420p" \
  -deadline good \
  -cpu-used 2 \
  -an \
  "${BASENAME}-480p.webm"

# 720p WebM
echo "Creating 720p WebM..."
ffmpeg -i "$INPUT" \
  -c:v libvpx-vp9 \
  -b:v 2500k \
  -minrate 1500k \
  -maxrate 3000k \
  -crf 30 \
  -vf "scale=-1:720,format=yuv420p" \
  -deadline good \
  -cpu-used 2 \
  -an \
  "${BASENAME}-720p.webm"

# 480p MP4
echo "Creating 480p MP4..."
ffmpeg -i "$INPUT" \
  -c:v libx264 \
  -preset slow \
  -crf 28 \
  -vf "scale=-1:480,format=yuv420p" \
  -movflags +faststart \
  -an \
  "${BASENAME}-480p.mp4"

# 720p MP4
echo "Creating 720p MP4..."
ffmpeg -i "$INPUT" \
  -c:v libx264 \
  -preset slow \
  -crf 23 \
  -vf "scale=-1:720,format=yuv420p" \
  -movflags +faststart \
  -an \
  "${BASENAME}-720p.mp4"

# Poster
echo "Creating poster image..."
ffmpeg -i "$INPUT" \
  -ss 00:00:02 \
  -vframes 1 \
  -q:v 3 \
  -vf "scale=1280:-1" \
  "${BASENAME}-poster.jpg"

echo "Done!"
echo ""
ls -lh "${BASENAME}"-*
```

**Make executable and run:**
```bash
chmod +x convert-video.sh
./convert-video.sh my-video.mp4
```

---

## Step 9: Verify File Sizes

**Windows:**
```batch
dir hero-*
```

**Mac/Linux:**
```bash
ls -lh hero-*
```

**Expected output:**
```
hero-480p.webm  ~1.0 MB
hero-720p.webm  ~3.0 MB
hero-480p.mp4   ~1.2 MB
hero-720p.mp4   ~3.5 MB
hero-poster.jpg ~100 KB
```

---

## Step 10: Test Video Quality

**Open in browser:**
```bash
# Python 3
python -m http.server 8000

# Then open http://localhost:8000/hero-480p.webm
```

**Check for:**
- [ ] Smooth playback
- [ ] No pixelation/blocking
- [ ] Colors look correct
- [ ] Loop is seamless (if looping)

---

## Troubleshooting

### File Too Large?

**Increase CRF (lower quality, smaller file):**
```bash
# For 480p, try -crf 40 instead of 35
ffmpeg -i input.mp4 -c:v libvpx-vp9 -b:v 800k -crf 40 -vf "scale=-1:480" -an hero-480p.webm
```

### Poor Quality?

**Decrease CRF (higher quality, larger file):**
```bash
# For 480p, try -crf 30 instead of 35
ffmpeg -i input.mp4 -c:v libvpx-vp9 -b:v 800k -crf 30 -vf "scale=-1:480" -an hero-480p.webm
```

### Video Won't Play?

**Check format support:**
```bash
ffmpeg -i hero-480p.webm
```

Ensure it shows:
- Video: VP9
- yuv420p pixel format

### Encoding Too Slow?

**Use faster preset:**
```bash
# Change -cpu-used 2 to -cpu-used 5
ffmpeg -i input.mp4 -c:v libvpx-vp9 -cpu-used 5 ...
```

---

## Online Conversion (No FFmpeg)

If you can't install FFmpeg:

### CloudConvert
1. Go to https://cloudconvert.com/webm-converter
2. Upload your video
3. Select output: WebM
4. Click wrench icon for settings:
   - Video Codec: VP9
   - Resolution: 854x480 (or 480p)
   - Constant Quality: 35
   - Audio: Disable
5. Convert and download

### FreeConvert
1. Go to https://www.freeconvert.com/webm-converter
2. Upload video
3. Select "Advanced Settings"
4. Set:
   - Video Codec: VP9
   - Video Quality: Medium
   - Resolution: 480p
   - Remove Audio: Yes
5. Convert

---

## File Structure After Conversion

```
public/
├── videos/
│   ├── hero-480p.webm    (~1 MB)   # Mobile
│   ├── hero-720p.webm    (~3 MB)   # Desktop
│   ├── hero-480p.mp4     (~1.2 MB) # Mobile fallback
│   └── hero-720p.mp4     (~3.5 MB) # Desktop fallback
└── images/
    └── hero-poster.jpg   (~100 KB) # Poster
```

---

## Next Steps

1. Run the conversion commands above
2. Place files in `public/videos/` and `public/images/`
3. Implement the `HeroVideo` React component (see VIDEO_OPTIMIZATION_GUIDE.md)
4. Test on actual 4G connection
5. Adjust bitrates if needed based on results

---

## Quick Reference Card

```bash
# One-liner for 480p WebM
ffmpeg -i input.mp4 -c:v libvpx-vp9 -b:v 800k -crf 35 -vf "scale=-1:480" -an hero-480p.webm

# One-liner for 720p WebM
ffmpeg -i input.mp4 -c:v libvpx-vp9 -b:v 2500k -crf 30 -vf "scale=-1:720" -an hero-720p.webm

# One-liner for poster
ffmpeg -i input.mp4 -ss 2 -vframes 1 -q:v 3 hero-poster.jpg