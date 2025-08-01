// 从 "@reduxjs/toolkit" 这个包里导入 `configureStore` 函数。
// Redux Toolkit 是官方推荐的、用来简化 Redux 开发的工具集。
// `configureStore` 是一个高级函数，它简化了创建和配置 Redux "store" 的过程。
import { configureStore } from "@reduxjs/toolkit";

// `store` 是 Redux 应用的核心，可以把它想象成一个"全局的、集中的数据仓库"。
// 整个应用所有需要共享的数据（状态）都存放在这个 `store` 对象中。
// `export` 关键字让这个 `store` 对象可以在项目的其他地方被导入和使用。

// 初始创建一个空的 store，具体的业务模块（如用户登录、权限管理等）
// 可以在需要时动态添加自己的 slice
export const store = configureStore({
  // `configureStore` 函数接收一个配置对象，其中 `reducer` 属性是必需的。
  // `reducer` 属性的值是一个对象，这个对象的作用是把我们所有不同模块的 reducer 函数组合起来。
  // Reducer 是一个纯函数，它接收当前的状态和一个 action（指令），然后返回一个新的状态。
  reducer: {
    // 初始时为空对象，具体的业务模块需要时再添加
    // 例如：login 页面可以添加 user slice
    // 例如：其他页面可以添加各自的 slice
  },
});

/*
  业务模块使用示例：
  
  如果 login 页面需要用户状态管理，可以：
  1. 在 pages/login/slice.ts 中创建 userSlice
  2. 在 store 中注册：
     import userSlice from "@/pages/login/slice";
     
     然后在 reducer 中添加：
     user: userSlice
     
  最终的状态结构可能是：
    {
      user: {
        name: string;
        avatar: string;
        token: string;
        routes: string[]; // 用户拥有的路由权限
        buttons: string[]; // 用户拥有的按钮权限
      },
      // 其他模块的状态...
    }
*/

// --- 下面的代码主要是为了配合 TypeScript 使用，提供更好的类型推断和代码安全 ---

// `dispatch` 是用来"派发 action"的方法。可以把它想象成是向仓库管理员下达一个"更新数据"的指令。
// 例如 `dispatch(loginSuccess(userInfo))` 就是告诉 Redux 去执行 `loginSuccess` 这个操作。
// `typeof store.dispatch` 在 TypeScript 中，不是获取值，而是获取 `store.dispatch` 这个函数的"类型"。
// `export type AppDispatch = ...` 这行代码创建并导出了一个名为 `AppDispatch` 的新类型。
// 这样做的好处是，以后在组件中使用 `dispatch` 函数时，TypeScript 就能准确地知道这个函数接受哪些类型的 action，从而提供更好的代码提示和错误检查。
export type AppDispatch = typeof store.dispatch;

// `getState` 是一个用来"读取当前所有数据"的方法，调用 `store.getState()` 就会返回整个仓库的当前状态对象。
// `typeof store.getState` 同样是获取 `store.getState` 这个函数本身的类型。
// `ReturnType<...>` 是 TypeScript 提供的一个工具类型，它可以获取一个函数的返回值的类型。
// 所以 `ReturnType<typeof store.getState>` 的意思就是："请告诉我 `store.getState()` 这个函数执行后，返回的数据是什么类型的？"
// `export type RootState = ...` 这行代码创建并导出了一个名为 `RootState` 的新类型，这个类型就精确地代表了我们整个 Redux 仓库中所有数据的完整结构。
// 这个 `RootState` 类型非常有用，特别是在使用 `useSelector` 这个 Hook 从 store 中读取数据时，它能让 TypeScript 知道你取出的数据是什么类型，从而避免很多潜在的 bug。
export type RootState = ReturnType<typeof store.getState>;