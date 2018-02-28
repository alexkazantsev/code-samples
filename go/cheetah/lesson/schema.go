package lesson

import (
	"github.com/jinzhu/gorm"
	_ "github.com/michaeljs1990/val"
)

type Lesson struct {
	gorm.Model
	Name        string                `sql:"not null" json:"name"`
}

type Lessons []Lesson

type LessonResponseJSON struct {
	Name  		string                `json:"name"`
}

type LessonRequestJSON struct {
	// Name      *uint   `json:"name" validate:"required"`
}
