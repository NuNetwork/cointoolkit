(function () {
	var memberOf = {
		Nu: {
			SMG_USNBT: 1,
			SMG_USNBT_2_OF_3: 2
		}
	}

	var known = {
		pubKey: {
			// "pubkey": {name:"John Doe"},

			// Developer
			"02113443efda4a9fe9bd38ca1f932aaee2c3cb6ee637f22eaa25af370a1cde6952": {name:"Developer", email:"ttutdxh.nubits@gmail.com", fee:1},
		},
		scriptHash: {
			// Bis6BdPwdRg5dQiCEKAhjCwDkxpsGzKeJ6
			"a55f3c8f377f2b9436ce3c42d12bff7b6b9d5f76": {name: "SMG USNBT 2 OF 3"},
			// 522103c36f60a916fc9480983bc5166949dea09a4815592271160118ee965f2f339b17210396f3d2bdb56bf460a14532fcc523090a239ab1c8de4a083d55111a59dca7a3f32103af7d10aed63a3d91cbacdd9f68b2e197e0a9696b54210278bbc061f5ba6eb92653ae

			// BpDJpPxgHbEkNmeivsLu4RqBPCaBsjsqCB
			"e00abb2275d64badd6ba14d7090e6fc647749199": {name: "SMG USNBT"},
			// 522102b40eac372686090d563c5535b94137d02d986b99c318f5de5140b13f2d12b1e621025644ea515e6fac176efa63fe19e0342b19b3f32f27583e3d0a1bb78c966f28b321033eedb31d02dc810cad13c3c0c51120967e9ae2cfae6fa803f73bd6117f0691f8210312d4ebbf0c5922d21099a92e508787af887beff4a4d1be1deb1dacb0889d5f9254ae
		},
		identities: { // id.pubkey{memberof, [deprecated]}
			"woolly_sammoth": {
				"02b40eac372686090d563c5535b94137d02d986b99c318f5de5140b13f2d12b1e6": {
					member: [
						memberOf.Nu.SMG_USNBT
					]
				},
				"03c36f60a916fc9480983bc5166949dea09a4815592271160118ee965f2f339b17": {
					member: [
						memberOf.Nu.SMG_USNBT_2_OF_3
					]
				}
			},
			"Cybnate": {
				"033eedb31d02dc810cad13c3c0c51120967e9ae2cfae6fa803f73bd6117f0691f8": {
					member: [
						memberOf.Nu.SMG_USNBT
					]
				}
			},
			"jooize": {
				"025644ea515e6fac176efa63fe19e0342b19b3f32f27583e3d0a1bb78c966f28b3": {
					member: [
						memberOf.Nu.SMG_USNBT
					]
				},
				"0396f3d2bdb56bf460a14532fcc523090a239ab1c8de4a083d55111a59dca7a3f3": {
					member: [
						memberOf.Nu.SMG_USNBT_2_OF_3
					]
				}
			},
			"Phoenix": {
				"0312d4ebbf0c5922d21099a92e508787af887beff4a4d1be1deb1dacb0889d5f92": {
					member: [
						memberOf.Nu.SMG_USNBT
					]
				},
				"03af7d10aed63a3d91cbacdd9f68b2e197e0a9696b54210278bbc061f5ba6eb926": {
					member: [
						memberOf.Nu.SMG_USNBT_2_OF_3
					]
				}
			}
		}
	};


	for (var id in known.identities) { // Compute pubkey list
		for (var pubkey in known.identities[id]) {

			// Nu Groups
			var NU = [];
			for (var group in known.identities[id][pubkey].member) {
				if (known.identities[id][pubkey].member[group] == memberOf.Nu.SMG_USNBT) NU.push("SMG_USNBT");
				if (known.identities[id][pubkey].member[group] == memberOf.Nu.SMG_USNBT_2_OF_3) NU.push("SMG_USNBT_2_OF_3");
			}
			if (NU.length > 0) {
				var prefix = (known.identities[id][pubkey].deprecated)?"DEPRECATED ":"";
				known.pubKey[pubkey] = {
					name: prefix + " " + id + " [ " + (NU.join(", ")) + " ]",
				}
			}
		}
	}

	// Mark deprecated. Handling will change in the future. Maybe an alert.
	for (var hash in known.scriptHash) {
		known.scriptHash[hash].name = (known.scriptHash[hash].deprecated)?"DEPRECATED " + known.scriptHash[hash].name:known.scriptHash[hash].name;
	}

	window['known'] = known;
})();

console.log("Loaded known identities", known);
