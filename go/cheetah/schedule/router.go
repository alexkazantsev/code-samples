package schedule

import (
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
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
		ctx.JSON(http.StatusOK, result.Value)
	})

	r.GET("/:id", func(ctx *gin.Context) {
		conn := ctx.MustGet("conn").(*gorm.DB)
		id := ctx.Param("id")
		result, err := FetchById(conn, id)
		if err != nil {
			ctx.JSON(http.StatusNotFound, err)
			ctx.Abort()
		}
		ctx.JSON(http.StatusOK, result.Value)
	})

	
}
