# ==========================================
# Image Usage Scanner
# ==========================================

$projectRoot = Get-Location

# Image extensions to scan
$imageExtensions = @(
    ".png", ".jpg", ".jpeg", ".gif",
    ".webp", ".svg", ".avif", ".bmp", ".ico"
)

# Code/text files that may contain image references
$codeExtensions = @(
    ".html", ".htm", ".css", ".js", ".jsx",
    ".ts", ".tsx", ".json", ".php", ".vue",
    ".xml", ".md"
)

Write-Host "`nScanning project..." -ForegroundColor Cyan

# Find all images
$images = Get-ChildItem -Path $projectRoot -Recurse -File |
    Where-Object {
        $imageExtensions -contains $_.Extension.ToLower()
    }

# Find all source/code files
$codeFiles = Get-ChildItem -Path $projectRoot -Recurse -File |
    Where-Object {
        $codeExtensions -contains $_.Extension.ToLower()
    }

# Read all source files
$allCode = ""

foreach ($file in $codeFiles) {
    try {
        $allCode += "`n" + (Get-Content $file.FullName -Raw)
    }
    catch {
        Write-Host "Could not read: $($file.FullName)" -ForegroundColor Yellow
    }
}

$used = @()
$unused = @()

foreach ($image in $images) {

    $fileName = $image.Name
    $relativePath = $image.FullName.Substring($projectRoot.Path.Length + 1)

    # Check filename
    $filenameUsed = $allCode -match [regex]::Escape($fileName)

    # Check relative path using both slash styles
    $relativeForward = $relativePath -replace '\\', '/'
    $relativeBack = $relativePath -replace '/', '\'

    $pathUsed =
        ($allCode -match [regex]::Escape($relativeForward)) -or
        ($allCode -match [regex]::Escape($relativeBack))

    if ($filenameUsed -or $pathUsed) {
        $used += $image
    }
    else {
        $unused += $image
    }
}

# ==========================================
# Results
# ==========================================

Write-Host "`n==========================================" -ForegroundColor DarkGray
Write-Host " USED IMAGES: $($used.Count)" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor DarkGray

foreach ($image in $used) {
    $relative = $image.FullName.Substring($projectRoot.Path.Length + 1)
    Write-Host "[USED]   $relative" -ForegroundColor Green
}

Write-Host "`n==========================================" -ForegroundColor DarkGray
Write-Host " UNUSED / NOT FOUND: $($unused.Count)" -ForegroundColor Red
Write-Host "==========================================" -ForegroundColor DarkGray

foreach ($image in $unused) {
    $relative = $image.FullName.Substring($projectRoot.Path.Length + 1)
    Write-Host "[UNUSED] $relative" -ForegroundColor Red
}

# ==========================================
# Save results to files
# ==========================================

$used | ForEach-Object {
    $_.FullName.Substring($projectRoot.Path.Length + 1)
} | Out-File "used-images.txt"

$unused | ForEach-Object {
    $_.FullName.Substring($projectRoot.Path.Length + 1)
} | Out-File "unused-images.txt"

Write-Host "`nResults saved:" -ForegroundColor Cyan
Write-Host "  used-images.txt"
Write-Host "  unused-images.txt"

Write-Host "`nScan complete.`n" -ForegroundColor Cyan