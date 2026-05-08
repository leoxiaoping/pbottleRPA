"""
PBottle RPA demo. Please refer to the *process documentation* for specific APIs.
Official website: https://rpa.pbottle.com/
Process documentation: https://rpa.pbottle.com/docs/

Feature description: This script demonstrates the common utility functions (utils) in RPA.
Through this example, you can learn how to use various practical utility functions provided by pbottleRPA.
"""

import sys
import os

# Add parent directory to path to import pbottleRPA
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import pbottleRPA


def main():
    print("=== Common Utilities: pbottleRPA.utils ===")

    # TTS demonstration
    pbottleRPA.tts("Common utilities demonstration")
    # Show system message box to prompt the user
    pbottleRPA.showMsg("PBottle RPA Tip", "Common utilities demonstration")
    pbottleRPA.wait(2)

    # Standard formatted time demonstration
    print("--- Time formatting: getTime ---")
    # Use the toolbox's getTime function to get the current time
    time_str = pbottleRPA.getTime()
    print("Standard formatted time:", time_str)
    # Get a custom formatted date (Year/Month/Day format)
    print("Custom formatted date:", pbottleRPA.getTime("Y/m/d"))
    pbottleRPA.wait(1)

    # Unique ID generation demonstration
    print("--- Unique ID: uniqid ---")
    # Generate a default unique ID (based on timestamp)
    print(pbottleRPA.uniqid())
    # Generate a unique ID with a custom prefix
    print(pbottleRPA.uniqid("myPrefix_"))
    # Generate a unique ID with extra randomness
    print(pbottleRPA.uniqid("", True))
    pbottleRPA.wait(1)

    # Numeric string detection demonstration
    print("--- Check if a variable is numeric: isNumeric ---")
    # Test various data types to see if they are numeric
    print("isNumeric(10):       ", pbottleRPA.isNumeric(10))  # Integer: True
    print('isNumeric("10"):     ', pbottleRPA.isNumeric("10"))  # Numeric string: True
    print('isNumeric("10.5"):   ', pbottleRPA.isNumeric("10.5"))  # Decimal string: True
    print(
        'isNumeric("abc"):    ', pbottleRPA.isNumeric("abc")
    )  # Non-numeric string: False
    print(
        "isNumeric(None):     ", pbottleRPA.isNumeric(None)
    )  # None: False (equivalent to JS null)
    pbottleRPA.wait(1)

    # hasData demonstration: check if a variable contains meaningful data
    print("--- hasData: check if a variable contains data ---")
    # Test various data types
    print(
        "hasData(None):              ", pbottleRPA.hasData(None)
    )  # None (like JS undefined): False
    print("hasData([]):                ", pbottleRPA.hasData([]))  # Empty list: False
    print(
        "hasData({}):                ", pbottleRPA.hasData({})
    )  # Empty dict: False (JS empty object)
    print("hasData(0):                 ", pbottleRPA.hasData(0))  # Number 0: False
    print('hasData(""):                ', pbottleRPA.hasData(""))  # Empty string: False
    print(
        'hasData("   "):             ', pbottleRPA.hasData("   ")
    )  # Whitespace string: False
    print(
        "hasData(False):             ", pbottleRPA.hasData(False)
    )  # Boolean False: False
    print("---------------------------")
    print(
        "hasData(3.14):              ", pbottleRPA.hasData(3.14)
    )  # Non-zero decimal: True
    print(
        'hasData("PBottle RPA "):    ', pbottleRPA.hasData("PBottle RPA ")
    )  # Non-empty string: True
    print(
        "hasData([12,5]):            ", pbottleRPA.hasData([12, 5])
    )  # Non-empty list: True
    print(
        'hasData({"pbottle":666}):   ', pbottleRPA.hasData({"pbottle": 666})
    )  # Non-empty dict: True
    pbottleRPA.wait(1)

    # Substring extraction demonstration
    # Define the string to process
    str_val = "The PBottle RPA official website is https://www.pbottle.com. Enter it in your browser to visit."
    print("--- Substring extraction test ---", str_val)
    # Extract content between two markers ("website is " and "Enter")
    sub_str = pbottleRPA.substringFromTo(str_val, "website is ", "Enter")
    print("Extracted substring:", sub_str)
    pbottleRPA.wait(1)

    # Simulate file search in File Explorer: searchFile
    print("--- Simulate file search: searchFile ---")
    # Search for files with a specified extension in the project root directory, including subdirectories
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    rs = pbottleRPA.searchFile(base_dir, ".png", True)
    print("Search for .png files in the current directory:", rs)


if __name__ == "__main__":
    main()
