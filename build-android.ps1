<#
Windows helper script to build the Android project locally.
Run from the repository root in PowerShell (Admin may be required).

Usage:
  .\build-android.ps1

What it does:
  - Downloads Android command-line tools (if missing)
  - Installs platform-tools, platform 33 and build-tools 33.0.2
  - Writes `android/local.properties` with SDK path
  - Runs Gradle assembleRelease (uses local gradle if available)
#>

$ErrorActionPreference = 'Stop'

$sdkRoot = "$PWD\android-sdk"
if (-Not (Test-Path $sdkRoot)) { New-Item -ItemType Directory -Path $sdkRoot | Out-Null }

Write-Host "Using SDK root: $sdkRoot"

$cmdlineZip = "$PWD\commandlinetools-win.zip"
if (-not (Test-Path "$sdkRoot\cmdline-tools\latest")) {
    Write-Host 'Downloading command-line tools...'
    Invoke-WebRequest 'https://dl.google.com/android/repository/commandlinetools-win-9477386_latest.zip' -OutFile $cmdlineZip -UseBasicParsing
    Expand-Archive -Path $cmdlineZip -DestinationPath "$sdkRoot\cmdline-tools" -Force
    Remove-Item $cmdlineZip -Force
    if (Test-Path "$sdkRoot\cmdline-tools\cmdline-tools") {
        Move-Item -Path "$sdkRoot\cmdline-tools\cmdline-tools" -Destination "$sdkRoot\cmdline-tools\latest"
    }
}

$env:ANDROID_SDK_ROOT = $sdkRoot
$env:ANDROID_HOME = $sdkRoot
$env:Path = "$sdkRoot\cmdline-tools\latest\bin;" + $env:Path

Write-Host 'Installing SDK packages (may prompt to accept licenses)...'
& sdkmanager.bat --sdk_root="$sdkRoot" "platform-tools" "platforms;android-33" "build-tools;33.0.2"
& cmd /c "echo y | sdkmanager.bat --sdk_root=\"$sdkRoot\" --licenses"

# create local.properties for Android Gradle Plugin
$localPropsPath = "$PWD\android\local.properties"
"sdk.dir=$sdkRoot" | Out-File -FilePath $localPropsPath -Encoding ASCII
Write-Host "Wrote $localPropsPath"

# Run Gradle (use wrapper if present)
Push-Location android
if (Test-Path "gradlew.bat") {
    Write-Host 'Running gradlew.bat assembleRelease'
    & .\gradlew.bat :app:assembleRelease --no-daemon
} else {
    Write-Host 'No gradlew found; please install Gradle or add wrapper to android/'
}
Pop-Location
