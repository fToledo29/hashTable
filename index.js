function HashTable(size) {
	this.buckets = Array(size); 
	this.numBucket = this.buckets.length;
}

function HashNode(key, value, next) {
	this.key = key;
	this.value = value;
	this.next = next || null;
}

HashTable.prototype.hash = function(key) {
	let total = 0;

	for (let i = 0; i < key.length; i++) {
		total += key.charCodeAt(i);
	}

	/**
	 * If we divide any number by n (numBucket) set
	 * then the remainder can only be between 0 
	 * and n (numBucket)
	 */
	const bucket = total % this.numBucket;

	return bucket;
}

HashTable.prototype.insert = function(key, value) {
	let indx = this.hash(key);
	if (!this.buckets[indx]) {
		this.buckets[indx] = new HashNode(key, value);
	} else if (this.buckets[indx].key === key) {
			this.buckets[indx].value = value;
	} else {
		let currNode = this.buckets[indx];

		while (currNode.next) {
			if (currNode.next.key === key) {
				currNode.next.value = value;
				return;
			}
			currNode = currNode.next;
		}

		currNode.next = new HashNode(key, value);
	}
}

HashTable.prototype.get = function(key) {
	const indx = this.hash(key);
	if(!this.buckets[indx]) {
		return null;
	} else {
		let currNode = this.buckets[indx];
		while (currNode) {
			if (currNode.key === key) {
				return currNode.value;
			}
			currNode = currNode.next;
		}

		return null;
	}
}

HashTable.prototype.delete = function(key) {
	const indx = this.hash(key);
	if(!this.buckets[indx]) {
		return null;
	} else if (this.buckets[indx].key === key) {
			if (this.buckets[indx].next) {
				this.buckets[indx] = this.buckets[indx].next;
			} else {
				this.buckets[indx] = null;
			}
	} else {
		let currNode = this.buckets[indx];
		while (currNode.next) {
			if (currNode.next.key === key) {
				if (currNode.next.next) {
					currNode.next = currNode.next.next;
				} else {
					currNode.next = null;
				}
				return key + ' --  Deleted.'
			}
			currNode = currNode.next;
		}

		return 'Not found';
	}
}



var myht = new HashTable(30);

// myht.insert('Fernando', 'fernandotxxx@gmail.com');
myht.insert('Jonh', 'Jonh@gmail.com');
myht.insert('Dane', 'dane@gmail.com');
myht.insert('Dean', 'dean@gmail.com');
myht.insert('fernando', 'otherEmail@gmail.com');
myht.insert('rolando', 'rolando@gmail.com');



console.log(myht.get('rolando'));
console.log(myht.buckets);
console.log(myht.delete('Dane'));
console.log(myht.delete('Dean'));
console.log(myht.buckets);