"""
PBottle RPA asynchronous sub‑process template

Feature description: This script demonstrates how to use sub‑processes (sync/async) in RPA.
Through this example, you can learn how to call synchronous and asynchronous sub‑processes
from the main flow and handle their return values.
"""

# Import the core PBottle RPA library
import pbottleRPA
import subprocess
import sys
import os
import importlib.util

# ========== Global Variables ==========
global_processName = "PBottle RPA — XXXX Process Template"  # Process name
global_startTime = pbottleRPA.getTime()  # Start time


def sync_subprocess(script_path):
    """
    Execute a synchronous sub‑process script (blocking)
    @param script_path: absolute/relative path to a .py file
    """
    print("Launching synchronous sub‑process:", script_path)
    script_path = os.path.abspath(script_path)
    result = subprocess.run(
        [sys.executable, "-u", script_path],
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="ignore",
    )
    if result.returncode == 0:
        print(f"✅ Synchronous sub‑process finished: {script_path}")
        if result.stdout.strip():
            print("  Sub‑process output:", result.stdout.strip())
        return result.stdout
    else:
        print(
            f"❌ Synchronous sub‑process failed (exit code {result.returncode}): {script_path}"
        )
        if result.stderr.strip():
            print("  Error message:", result.stderr.strip())
        return None


def async_subprocess(script_path, *args):
    """
    Run a sub‑process script in a new process (non‑blocking), returns a subprocess object.
    Note: Python's standard library does not directly support async/await style cross‑process calls;
    here we use subprocess + threading to simulate asynchronous behaviour.

    @param script_path: .py file path
    @param *args: arguments passed to the child script via the command line
    @return: subprocess.Popen object, use .wait() to block until completion
    """
    print("Launching asynchronous sub‑process:", script_path)
    script_path = os.path.abspath(script_path)
    proc = subprocess.Popen(
        [sys.executable, "-u", script_path] + list(args),
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        encoding="utf-8",
        errors="ignore",
    )
    return proc


def dynamic_import_module(module_path):
    """
    Dynamically import another .py file as a Python module and return it
    (equivalent to JS require() returning module.exports)

    @param module_path: .py file path
    @return: module object whose functions can be called
    """
    module_path = os.path.abspath(module_path)
    module_name = os.path.splitext(os.path.basename(module_path))[0]
    spec = importlib.util.spec_from_file_location(module_name, module_path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


# ========== Sub‑function Definitions ==========
def sub_process2(params):
    """Inline sub‑process function that receives parameters"""
    print("Sub‑process 2 started", params)
    # Write your sub‑process logic here...
    print("Sub‑process 2 ended")
    return True


# ========== Main Flow ==========
def main():
    """Main flow entry point"""
    try:
        # Log main flow start information
        pbottleRPA.log("Main process started 📍", global_startTime, global_processName)

        # ---- Method 1: Call an inline sub‑function directly (synchronous) ----
        print("--- Calling inline sub‑process ---")
        sub_process2("input parameter 2")

        # ---- Method 2: Synchronously invoke an external .py script (blocking) ----
        # Equivalent to JS require('./xxx.js') executing top‑level code synchronously
        print("\n--- Launching synchronous sub‑process ---")
        current_dir = os.path.dirname(os.path.abspath(__file__))
        sync_subprocess(current_dir + "/QuickStart_demo_(3_lines).py")

        # ---- Method 3: Dynamically import an external module and call its functions ----
        # Equivalent to JS let rs = require('./test.js')(url)
        print("\n--- Launching dynamic module import ---")
        try:
            test_module = dynamic_import_module(current_dir + "/download_file_demo.py")
            # Call functions/variables in the module (if it exports any)
            print("✅ Sub‑module loaded successfully:", dir(test_module))
        except Exception as e:
            print(
                f"⚠ Sub‑module load failed (maybe the script is not designed as a module): {e}"
            )

        # ---- Method 4: Asynchronous sub‑process (non‑blocking) ----
        # Equivalent to JS await require('./test.js')() but in non‑blocking form
        print("\n--- Launching asynchronous sub‑process (child process) ---")
        proc = async_subprocess(current_dir + "/QuickStart_demo_(3_lines).py")
        # Do other things here...
        # Wait for the child process to complete
        proc.wait()
        out, err = proc.communicate()
        if out and out.strip():
            print("Asynchronous sub‑process output:", out.strip())

        # Main process finished
        pbottleRPA.log("Main process completed ✅")
        return True

    except Exception as e:
        # Main process error handling
        print("❌ Not completed, error", e)
        print("Preparing to send a message to the administrator 👉")
        # You can add logic here to send a WeChat notification or email:
        # pbottleRPA.wxMessage("RPA process exception", f"Error: {e}", "your_key")
        return False


# ========== Entry Point ==========
if __name__ == "__main__":
    main()
