"""
小瓶RPA异步子流程模板

功能说明：此脚本演示了RPA中如何使用子流程（同步/异步）
通过这个示例，您可以学习如何在主流程中调用同步和异步子流程，并处理子流程的返回结果。
"""

# 引入小瓶RPA的核心库
import pbottleRPA
import subprocess
import sys
import os
import importlib.util

# ========== 全局变量 ==========
global_processName = "小瓶RPA——XXXX流程模板"  # 流程名称
global_startTime = pbottleRPA.getTime()       # 开始时间


def 同步子流程(脚本路径):
    """
    执行一个同步子流程脚本（阻塞等待完成）
    @param 脚本路径: .py 文件的绝对/相对路径
    """
    print("启动同步子流程：", 脚本路径)
    脚本路径 = os.path.abspath(脚本路径)
    result = subprocess.run(
        [sys.executable, "-u", 脚本路径],
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="ignore",
    )
    if result.returncode == 0:
        print(f"✅ 同步子流程完成: {脚本路径}")
        if result.stdout.strip():
            print("  子流程输出:", result.stdout.strip())
        return result.stdout
    else:
        print(f"❌ 同步子流程失败 (exit code {result.returncode}): {脚本路径}")
        if result.stderr.strip():
            print("  错误信息:", result.stderr.strip())
        return None


def 异步子流程(脚本路径, *args):
    """
    在新进程中执行子流程脚本（非阻塞），返回 subprocess 对象
    注意：Python 标准库不直接支持 async/await 风格的跨进程调用，
    这里用 subprocess + 线程模拟异步行为。

    @param 脚本路径: .py 文件路径
    @param *args: 传递给子脚本的参数（通过命令行传入）
    @return: subprocess.Popen 对象，可调用 .wait() 等待完成
    """
    print("启动异步子流程：", 脚本路径)
    脚本路径 = os.path.abspath(脚本路径)
    proc = subprocess.Popen(
        [sys.executable, "-u", 脚本路径] + list(args),
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        encoding="utf-8",
        errors="ignore",
    )
    return proc


def 动态导入子模块(模块路径):
    """
    将另一个 .py 文件作为 Python 模块动态导入并调用其函数
    （等价于 JS 的 require() 返回 module.exports）

    @param 模块路径: .py 文件路径
    @return: 模块对象，可调用其中的函数
    """
    模块路径 = os.path.abspath(模块路径)
    模块名 = os.path.splitext(os.path.basename(模块路径))[0]
    spec = importlib.util.spec_from_file_location(模块名, 模块路径)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


# ========== 子函数定义 ==========
def 子流程2(params):
    """内联子流程函数，接收参数"""
    print("子流程2开始", params)
    # 在这里编写你的子流程逻辑...
    print("子流程2结束")
    return True


# ========== 主流程 ==========
def main():
    """主流程入口"""
    try:
        # 记录主流程开始信息
        pbottleRPA.log("主流程开始 📍", global_startTime, global_processName)

        # ---- 方式1：直接调用内部子函数（同步） ----
        print("--- 调用内联子流程 ---")
        子流程2("输入参数2")

        # ---- 方式2：同步调用外部 .py 脚本（阻塞） ----
        # 等价于 JS 的 require('./xxx.js') 同步执行顶层代码
        print("\n--- 启动同步子流程 ---")
        current_dir = os.path.dirname(os.path.abspath(__file__))
        同步子流程(current_dir + "/快速开始演示（3行代码）.py")

        # ---- 方式3：动态导入外部模块并调用其函数 ----
        # 等价于 JS 的 let rs = require('./test.js')(url)
        print("\n--- 启动动态导入子模块 ---")
        try:
            test_module = 动态导入子模块(current_dir + "/下载文件示例演示.py")
            # 调用模块中的函数/变量（如果该模块有导出的话）
            print("✅ 子模块加载成功:", dir(test_module))
        except Exception as e:
            print(f"⚠ 子模块加载失败（可能该脚本不是模块化设计）: {e}")

        # ---- 方式4：异步子进程（非阻塞） ----
        # 等价于 JS 的 await require('./test.js')() 但为非阻塞版本
        print("\n--- 启动异步子流程（子进程）----")
        proc = 异步子流程(current_dir + "/快速开始演示（3行代码）.py")
        # 可以在这里做其他事情...
        # 等待子流程完成
        proc.wait()
        out, err = proc.communicate()
        if out and out.strip():
            print("异步子流程输出:", out.strip())

        # 主流程完成
        pbottleRPA.log("主流程完成 ✅")
        return True

    except Exception as e:
        # 主流程错误捕获
        print("❌ 未完成，错误", e)
        print("准备发送消息给管理员 👉")
        # 这里可以添加发送微信通知/邮件的逻辑：
        # pbottleRPA.wxMessage("RPA流程异常", f"错误: {e}", "你的key")
        return False


# ========== 入口 ==========
if __name__ == "__main__":
    main()
