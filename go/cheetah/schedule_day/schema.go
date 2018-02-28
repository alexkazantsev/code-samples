package schedule_day

import (
	"cheetah/day"
	"cheetah/class"
	"github.com/jinzhu/gorm"
	_ "github.com/michaeljs1990/val"
)

type ScheduleDay struct {
	gorm.Model
	ScheduleID   uint                  `json:"schedule_id"`
	DayName		string		   `json:"day_name"`
	Day 	     day.Day		   `json:"day"`
	DayID	     uint		   `json:"day_id"`
	Classes	     class.Classes	   `json:"classes"`
}

type ScheduleDays []ScheduleDay

type ScheduleDayResponseJSON struct {
	DayName		string		   `json:"day_name"`
	//Day 	     day.Day		   `json:"day"`
	Classes	     class.Classes	   `json:"classes"`
}

type ScheduleDayRequestJSON struct {
	DayName		*string		   `json:"day_name"`

	Day 	     *day.Day		   `json:"day"`

	Classes	     *class.Classes	   `json:"classes"`
}
