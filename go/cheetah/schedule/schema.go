package schedule

import (
	"cheetah/group"
	"cheetah/schedule_day"
	"github.com/jinzhu/gorm"
	_ "github.com/michaeljs1990/val"
)

type Schedule struct {
	gorm.Model
	Group        	     group.Group                   `json:"group"`   //belongs to group with foreign key as GroupID
	GroupID      	     uint                  	   `json:"group_id"`
	ScheduleDays	     schedule_day.ScheduleDays	   `json:"schedule_days"`
}

type Schedules []Schedule

type ScheduleResponseJSON struct {
	Group      	     group.Group           	   `json:"group"`
	ScheduleDays	     schedule_day.ScheduleDays	   `json:"schedule_days"`
}

type ScheduleRequestJSON struct {
	Group     	     *uint   		 	   `json:"group" validate:"required"`
	ScheduleDays	     *schedule_day.ScheduleDays	   `json:"schedule_days"`
}
