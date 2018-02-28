package app_utils

import (
	"crypto/sha256"
	"encoding/hex"
	"io"
)

func CryptPass(pass string) string {
	hash := sha256.New()
	io.WriteString(hash, pass)
	return hex.EncodeToString(hash.Sum(nil))
}

func ComparePass(income, saved string) bool {
	_income := CryptPass(income)
	return _income == saved
}
