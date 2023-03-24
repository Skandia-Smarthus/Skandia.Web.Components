function StromPrisSetup() {

// Click
    $("#findElPriceBtn").click(function () {
        let zip = $("#spotPriceZip").val();
        getElSpotPrice(zip);
    });

// Press enter
    $(document).on('keypress', function (e) {
        if (e.which == 13) {
            let zip = $("#spotPriceZip").val();
            getElSpotPrice(zip);
        }
    });

    document.querySelectorAll(".elPriceMap g").forEach(group => {
        group.addEventListener('click', function (e) {
            clearMap();

            this.classList.add('active');

            getElSpotPrice(null, this.dataset.area);
        });
    });

    function getElSpotPrice(zip = null, zone = null) {
        // Creating Our XMLHttpRequest object
        let xhr = new XMLHttpRequest();

        var apiUrl = "https://app-elkompis-service-prod.azurewebsites.net/";
        // Making our connection
        if (zip !== null) {
            var url = apiUrl + "Public/Spotprice/" + zip;
            xhr.open("GET", url, true);
        }
        if (zone !== null) {
            let zipCode;
            if (zone == "1") zipCode = 3010;
            else if (zone == "2") zipCode = 4010;
            else if (zone == "5") zipCode = 5010;
            else if (zone == "3") zipCode = 6010;
            else if (zone == "4") zipCode = 8010;
            var url = apiUrl + "Public/Spotprice/" + zipCode;
            xhr.open("GET", url, true);
        }

        // function execute after request is successful
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let jsonContent = JSON.parse(this.responseText);
                if (jsonContent.value != null) {
                    let content = `Spot ${jsonContent.value} &Oslash;re/kWh`;
                    document.querySelector("#spotPriceResult p").innerHTML = content;
                    document.querySelector("#spotPriceResult h4").innerHTML = jsonContent.area;
                    clearMap();
                    document.querySelector('#' + jsonContent.area).classList.add('active');
                } else {
                    document.querySelector("#spotPriceResult p").innerHTML = "Ugyldig postnummer";
                    document.querySelector("#spotPriceResult h4").innerHTML = "";
                    clearMap();
                }
            }
        };
        // Sending our request
        xhr.send();
    }

    function clearMap() {
        document.querySelectorAll('.elPriceMap g').forEach(group => {
            group.classList.remove('active');
        });
    }
}

