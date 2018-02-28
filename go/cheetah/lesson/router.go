package lesson

import (
	// "cheetah/app_utils"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	// "github.com/michaeljs1990/val"
	"net/http"
)

func Router(r *gin.RouterGroup) {

	r.GET("", func(ctx *gin.Context) {
		conn := ctx.MustGet("conn").(*gorm.DB)
		result, err := Fetch(conn)
		if err != nil {
			ctx.JSON(http.StatusNotFound, result.Error)
			ctx.Abort()
		}
		// ctx.JSON(http.StatusOK, "test")
		ctx.JSON(http.StatusOK, result)
	})

	// r.POST("", func(ctx *gin.Context) {
	// 	var classInput ClassRequestJSON
	// 	conn := ctx.MustGet("conn").(gorm.DB)

	// 	if _err := val.Bind(ctx.Request.Body, &classInput); _err == nil {
	// 		result, err := Create(&conn, &classInput)
	// 		if err != nil {
	// 			ctx.JSON(http.StatusBadRequest, app_utils.APPError{Message: err.Error()})
	// 		} else {
	// 			ctx.JSON(http.StatusOK, result)
	// 		}
	// 	} else {
	// 		ctx.JSON(http.StatusBadRequest, app_utils.APPError{
	// 			Message: "Some of your data is not correct!",
	// 		})
	// 	}

	// })
	
}
