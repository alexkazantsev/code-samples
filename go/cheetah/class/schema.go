package class

import (
	"cheetah/teacher"
	"cheetah/lesson"
	"github.com/jinzhu/gorm"
	_ "github.com/michaeljs1990/val"
)

type Class struct {
	gorm.Model
	Lesson        lesson.Lesson           	`json:"lesson"`   //belongs to group with foreign key as GroupID
	LessonID      uint                  	`json:"lesson_id"`
	Building      string             	`sql:"not null" json:"building"`
	RoomNum       uint             		`sql:"not null" json:"room_num"`
	Even	      bool 			`default:"false" json:"even"`
	Position      uint			`json:"position"`
	Teacher		teacher.Teacher		`json:"teacher"`
	TeacherID	uint			`json:"teacher_id"`
	ScheduleDayID	uint			`json:"schedule_day_id"`
}

type Classes []Class

type ClassResponseJSON struct {
	Lesson      lesson.Lesson        			`json:"lesson"`
	Teacher		teacher.Teacher				`json:"teacher"`
	Building 	string					`json:"building"`
	RoomNum		uint					`json:"room_num"`
	Position	uint					`json:"position"`
	Even		bool					`json:"even"`
}

type ClassRequestJSON struct {
	Building  *string `json:"building"`
	RoomNum   *uint `json:"room_num"`
	Position   *uint `json:"position"`
	Even      *bool `json:"even"`
	LessonID    *uint   `json:"lesson_id"`
	TeacherID	*uint	`json:"teacher_id"`
	ScheduleDayID	*uint	`json:"schedule_day_id"`
}
