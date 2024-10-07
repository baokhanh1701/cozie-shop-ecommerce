# Notes

## A. Square to DB

1. If not exists in DB --> create.
2. If exists --> track changes (need to retrieve from db)
   1. If has changes --> updates
   2. If not --> continue

## B. DB to Square

1. If not exists Square --> create
2. If exists --> track changes (need to retrieve from Square)
   1. If has changes --> updates
   2. If not --> continue

## C. Check deleted Items

1. Jsonata --> list all Ids that exists on database but not on Square data
2. Delete Those Ids that not exists on database.

## Solution

Work with JSONATA.

1. Pull data from database to a JSON file.
2. Pull data from Square to a JSON file.
3. C. Check deleted items
4. A. Square to DB
5. B. DB to Square
6. Return products
