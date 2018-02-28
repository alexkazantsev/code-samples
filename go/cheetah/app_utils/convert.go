package app_utils

import (
	"strconv"
	"github.com/Sirupsen/logrus"
)

func StringToUint(str string) uint {
	result, err := strconv.ParseUint(str, 10, 64)
	if err != nil {
		logrus.Errorln("PARSE ERROR -->> ", str)
		return 0
	}
	return uint(result)
}

