zalihui source1=src/Stock.ts source1=src/Category.ts source1=src/Chunk.ts source1=src/Product.ts source1=src/Tag.ts target=prebuild/index.ts

tsc

terser prebuild/index.js --output index.js

npm publish --access=public