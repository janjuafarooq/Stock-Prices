for i in *.csv; do
	./mongo/bin/mongoimport -d companyDatabase -c companies --type csv --file $i --headerline --upsertFields Symbol --ignoreBlanks
done
