import csv
from models import Commune

with open('codetest\codepostal\static\codepostal\codepos.csv') as csvfile:
    reader = csv.reader(csvfile)
    next(reader)  # skip header row
    communes = [Commune(nom=row[0], code=row[1]) for row in reader]
    Commune.objects.bulk_create(communes)
