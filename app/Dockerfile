FROM node:lts as dependencies
WORKDIR /my-project
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:lts as builder
WORKDIR /my-project
COPY . .
COPY --from=dependencies /my-project/node_modules ./node_modules
RUN yarn build

FROM node:lts as runner
WORKDIR /my-project
ENV NODE_ENV production
COPY --from=builder ./public ./public
COPY --from=builder ./.next ./.next
COPY --from=builder ./node_modules ./node_modules
COPY --from=builder ./package.json ./package.json

EXPOSE 3000
CMD ["yarn", "start"]