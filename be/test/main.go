package main

import (
	"fmt"
)

func main() {
	arr := []int{1, 2, 3, 4, 5}
	for idx, value := range arr {
		fmt.Println(idx, value)
	}
}
