<?php
// Path to the CSV file
$name=$_POST['name'];
$email=$_POST['email'];
$tel=$_POST['tel'];
$address1=$_POST['address1'];
$address2=$_POST['address2'];
$city=$_POST['city'];
$province=$_POST['state'];
$pcode=$_POST['zip'];
// $tot1=$_POST('total1');
// $tot2=$_POST('total2');
// $radpmt=$_POST['pmt']; //shap, eW, imm, eft, oth, cc
// $raddel=$_POST['del']; //pudo, paxi, postN, collect

//if (radpmt=="imm") {  
//}

$csvFile = 'data.csv';

// Initialize an empty array for the data
$data = [];

// Read the CSV file
if (($handle = fopen($csvFile, 'r')) !== false) {
    while (($row = fgetcsv($handle)) !== false) {
        $data[] = $row; // Add each row to the data array
    }
    fclose($handle);
}
// Create HTML content with two tables
$htmlContent = '
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
    <style>
        body {
            max-width: 700px;
            margin-left: auto;
            margin-right:auto;
        }
        h2 {
            color: red;
        }
        h3 {
            color:brown;
        }
        .firstTotRow {
            font-weight: bold;
            border-bottom: 1px solid #ccc;
            color:black;
            vertical-align: middle;
        }

        .lastTotRow {
            border-top: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
            font-weight: bold;
            color:black;
            vertical-align: middle;
        }
        footer {
            position: relative;
            bottom: 0;
            left: 0;
            background-color: hotpink;
            color: #fff;
            padding: 5px;
            text-align: center;
            font-size: 12px;
            line-height: 5px;
            margin:auto;
        }
        footer p span {
            font-weight: bold;
            color: yellow;
        }
    </style>
    <script>
        // Get current date and time
        var now = new Date();
        var datetime = now.toLocaleString();
        // Insert date and time into HTML
        document.getElementById("datetime").innerHTML = datetime;
    </script>
</head>
<body>
    <h2 style="text-align: center; background-color:hotpink; padding:10px; color:yellow">Your Order with Simone\'s Boutique</h2>
        Dear Valued Client,
        <br><br>
        Thank you for the order as confirmed below. Please send full payment and proof of payment as instructed below. Please ensure the exact amount is paid. We will proceed with the delivery as soon as the payment has been received. Note there is a payment clearing time of 1-2 working days for standard EFT.
        <br><br>
        If there is a change to your delivery details please advise as a matter of urgency by replying to this email or calling.
        <br><br>
        If you wish to amend or cancel the order please advise as a matter of urgency by replying to this email. Note, any change to the order will necessitate a complete cancellation and a new order will have to be created against the stock status at the time. 
        <br><br>
        If we do not receive the full payment from you within 5 working days of this notification, we will assume you do not want the item(s) and we will cancel your order immediately.
        <br><br>
        For any questions regarding this order please reply to this email or contact us.
        <br><br>
        <hr>
        <h3>Shopping Cart Checkout</h3>
        <table width="40%" style="margin-left:auto; margin-right: auto; text-align: center; border-collapse: collapse">
            <thead>
                <tr style="border-bottom: 1px solid #ccc; height: 30px">
                    <th>Legging</th>
                    <th>SKU</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Subtotal</th>
                </tr>
            </thead>        
        <tbody>';
$imgArray = [];
$j=0;
foreach ($data as $row) {
    $htmlContent .= '<tr>';
    $i=0;
    foreach ($row as $cell) {
        if ($i==2) {
            $qty=$cell;
        }
        if ($i==3) {
            $price=$cell;
        }
        if ($i==0) {
            // img src="cid:image_cid"
            $htmlContent .= '<td><img src="cid:image_cid' . $j . '" width="40"></td>';
            $imgArray[$j]=$cell;
        }
        else {
            $htmlContent .= '<td>' . $cell . '</td>';    
        }
        $i=$i+1;
    }
    $j=$j+1;
    $htmlContent .= '<td>' . $qty*$price . '</td>';
    $htmlContent .= '</tr>';
}

$htmlContent .= '
        </tbody>
    </table>
    <hr>';

$currentDate = date('D, d-M-Y');
$totamt="R 1,200";
$htmlContent .= '<div style="text-align: center"><strong>The order was received on </strong>';
$htmlContent .= '<p style="color: blue"><strong>' . $currentDate . '</strong></p>';
$htmlContent .= '<p><strong>The total amount including delivery is </strong></p>';
$htmlContent .= '<p style="font-weight: bold; color: blue; font-size: 24px; margin:0px">' . $totamt . '</p></div><br>';

$htmlContent .= '
    <hr>
    <h3>Delivery and Billing</h3>
    <p style="margin-left:50px">Delivery by Pudo. Pick-up point to be agreed</p>
    <h3>Your details:</h3>
    <table width=100% style="margin-left:50px">';
    
$htmlContent .= '<tr><td style="width: 200px"><strong>Name:</strong></td><td>' . $name . '</td></tr>';
$htmlContent .= '<tr><td><strong>Email:</strong></td><td>' . $email . '</td></tr>';
$htmlContent .= '<tr><td><strong>Tel:</strong></td><td>' . $tel . '</td></tr>';
$htmlContent .= '<tr><td><strong>Address1:</strong></td><td>' . $address1 . '</td></tr>';
$htmlContent .= '<tr><td><strong>Address2:</strong></td><td>' . $address2 . '</td></tr>';
$htmlContent .= '<tr><td><strong>City:</strong></td><td>' . $city . '</td></tr>';
$htmlContent .= '<tr><td><strong>Province:</strong></td><td>' . $province . '</td></tr>';
$htmlContent .= '<tr><td><strong>Postal Code:</strong></td><td>' . $pcode . '</td></tr>';

$htmlContent .= '
    </table>
    <hr>
    <h3>Payment to be made</h3>        
    <table width=100% style="margin-left:50px">
        <tr>
            <td style="width: 200px"><strong>Payment Method:</strong></td>
            <td>Instant EFT</td>
        </tr>
        <tr>
            <td><strong>Total amount:</strong></td>
            <td>R 1,234</td>
        </tr>
            <td><strong>Account No:</strong></td>
            <td>12345678</td>
        <tr>
        </tr>
            <td><strong>Payshap No:</strong></td>
            <td>NED1234567</td>
        <tr>
            <td><strong>Bank:</strong></td>
            <td>Nedbank</td>
        <tr>
            <td><strong>Account Holder:</strong></td>
            <td>B Shah</td>
        <tr>
            <td><strong>Order Reference:</strong></td>
            <td>Order12345678</td>
        </tr>
        <tr>
            <td><strong>Proof of Payment to:</strong></td>
            <td>cyberhome101@gmail.com</td>
        </tr>
    </table>
    <h3 style="margin-top: 10px; margin-bottom: 10px">Payment Breakdown</h3>
    <table width=100% style="margin-left:50px" class="cart-totals">
        <thead style="vertical-align:top">
            <tr class="firstTotRow" style="font-weight:bold; border-bottom: 1px solid #ccc">
                <td style="width: 250px">Total Price (excl delivery)</td>
                <td class="t_price">0</td>
            </tr>
            <tr>
                <td>No of individual leggings</td>
                <td class="t_items">0</td>
            </tr>
            <tr>
                <td>Weight per Item (approx) (g)</td>
                <td class="t_wgtper">0</td>
            </tr>
            <tr>
                <td>Total Weight, incl packaging (g)</td>
                <td class="t_wgt">0</td>
            </tr>
            <tr>
                <td>Delivery charge (free above R500)</td>
                <td class="t_del">0</td>
            </tr>
            <tr class="lastTotRow">
                <td>Total Price with Delivery</td>
                <td class="t_all">0</td>
            </tr>
            <tr class="DeliveryRow">
                <td>Delivery based on method</td>
                <td class="t_all">10-15 days</td>
            </tr>
        </thead>
        <tbody id="table-body2" align="center">
        </tbody>
    </table>
    <br><br>
    <footer>
        <div class="grid-container">
            <div class="footer-area1">
                <h4>Contact us:</h4>
                <p><span>Email:</span> somewhere@gmail.com</p>
                <p><span>Tel (Mobile & Whatsapp:</span> 082-672-3452 (South Africa)</p>
                <p><span>Opening times:</span> 08:00 to 20:00 (GMT +2)</p>
                <p><span>Address:</span> Brackendown, Alberton, Gauteng, South Africa</p>
            </div>
        </div>
    </footer>
</body>
</html>';

// Save the HTML content to a file
$filePath = 'generated_page.html'; // Save in the same directory as index.php
file_put_contents($filePath, $htmlContent);

echo "HTML page has been generated and saved as <a href=\"$filePath\">$filePath</a>.";
// header("Location: cart.html");