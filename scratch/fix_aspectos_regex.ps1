$path = "c:\Users\Willy\OneDrive\Desktop\Archivo-Blindado\data\articulos.json"
$speechPath = "c:\Users\Willy\OneDrive\Desktop\Archivo-Blindado\scratch\correct_aspectos.txt"

# Read both files in UTF-8
$content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
$newSpeech = [System.IO.File]::ReadAllText($speechPath, [System.Text.Encoding]::UTF8)

# Trim any trailing whitespace or newlines from newSpeech
$newSpeech = $newSpeech.Trim()

# Regex pattern to match the "contenido" field of the aspects article (without comma since it is the last item!)
$pattern = '(?s)("id":\s*"A_R_04-05_06_aspectos_vida_cotidiana_italia"[\s\S]*?"contenido":\s*")[\s\S]*?("\s*\})'

$match = [regex]::Match($content, $pattern)
if ($match.Success) {
    $leftPart = $content.Substring(0, $match.Groups[1].Index) + $match.Groups[1].Value
    $rightPart = $match.Groups[2].Value + $content.Substring($match.Groups[2].Index + $match.Groups[2].Length)
    # Re-assemble the final JSON
    $updated = $leftPart + $newSpeech + $rightPart
    
    # Save the file with UTF-8 encoding (without BOM)
    $utf8NoBOM = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($path, $updated, $utf8NoBOM)
    Write-Host "Replaced via regex successfully!"
} else {
    Write-Error "Pattern match failed!"
}
