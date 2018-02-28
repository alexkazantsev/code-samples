package day

import (
	"github.com/jinzhu/gorm"
	_ "github.com/michaeljs1990/val"
)

type Day struct {
	gorm.Model
	Name		string		`json:"name"`
}

type Days []Day

type DayResponseJSON struct {
	Name		string		`json:"name"`

}

type DayRequestJSON struct {
	Name		*string		`json:"name"`

}
