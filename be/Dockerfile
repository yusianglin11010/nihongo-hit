FROM golang:1.19
COPY . /app/
WORKDIR /app
RUN go mod tidy
CMD go run main.go