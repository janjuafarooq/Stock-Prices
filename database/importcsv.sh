for i in *.csv; do
	./mongodb/bin/mongoimport -d companyDatabase -c companies --type csv --file $i --headerline --upsertFields Symbol --ignoreBlanks
done
