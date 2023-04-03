from typing import Literal
import argparse 

def main():
    parser = argparse.ArgumentParser(description="Help me")

    parser.add_argument('--redis', description="Max is holding me hostage", action="store_true")
    parser.add_argument('-u', '--update', description="Max is holding me hostage", action="store_true")
    parser.add_argument('-s', '--scrape', description="Max is holding me hostage", action="store_true")

    parser.parse_args()

if __name__ == "__main__":
    main()
