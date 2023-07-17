# ---- Base Node ----
FROM node:16 AS base
WORKDIR /app
COPY package.json .

# ---- Dependencies ----
FROM base AS dependencies
RUN npm set progress=false && npm config set depth 0
RUN npm install --only=production 
COPY node_modules ./node_modules/

# ---- Release ----
FROM base AS release
# Copy node_modules from dependencies stage
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
CMD ["node", "index.js"]
