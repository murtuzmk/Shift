# ---- Base Node ----
FROM node:18 AS base
WORKDIR /app/front_end
COPY front_end/package*.json ./
RUN npm install --loglevel=error

# ---- Build ----
FROM base AS build
WORKDIR /app/front_end
COPY ./front_end/ ./
RUN npm run build

# ---- Java Build ----
#FROM openjdk:11 AS java-build
#WORKDIR /app/back_end
#COPY ./back_end/ ./
#RUN javac Main.java

# ---- Release ----
#FROM node:18
#WORKDIR /app
COPY . .

#COPY --from=build /app/front_end/dist ./front_end/dist
#COPY --from=java-build /app/back_end/Main.class ./back_end/Main.class
ENV PORT=3000
EXPOSE 3000
CMD ["npm", "start"]