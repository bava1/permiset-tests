FROM mcr.microsoft.com/playwright:latest
WORKDIR /app
COPY . .
RUN npm install
RUN npx playwright install
CMD ["npx", "playwright", "test"]
