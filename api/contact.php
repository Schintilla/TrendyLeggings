<?php
    header("Content-Type: application/json");
    $confDisplay = 'display:none;';
    // if the url param exists, display confirmation
    if(isset($_GET["confirm"]) && $_GET["confirm"]==true){
        $confDisplay = 'display:inline;';
    }
?>

<!DOCTYPE html>
<html>

<head>
    <title>Simone's Boutique</title>
    <link rel="icon" type="image/x-icon" href="images/favicon.jpg">
    <link rel="stylesheet" href="css/style.css">
    <style>
        #detail {
            height: 200px;
            width: 500px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }

        #subjectoptions {
            height: 30px;
            width: 155px;
        }

        .contact-email input {
            width: 200px;
            height: 25px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        #btn:hover {
            color:blue;
        }
        #btn:focus {
            color:red;
            font-weight: bold;
        }
    </style>
</head>
<body>

    <header class="header-index">
        <table class="title">
            <tr>
                <td width="100%">
                    <h1>Simone's Boutique</h1>
                </td>
                <td class="cart-pic">
                    <a href="cart.html"><img src="images/shopping-cart-64.png"></a>
                </td>
                <td class="cart-status">
                    <span class="cart-count">Items: 0</span>
                    <br />
                    <span class="total">Total: R 0 </span>
                </td>
            </tr>
            <tr>
                <td colspan="3">
                    <nav>
                        <a href="index.html">Home</a>
                        <a href="shop.html">Shop</a>
                        <button type="button" class="cart-btn" onclick="gotoCart()">Cart</button>
                        <!--<a href="cart.html" class="cart-status">Cart</a>-->
                        <a class="active" href="contact.html">Contact</a>
                        <a href="FAQ.html">FAQ</a>
                    </nav>
                </td>
            </tr>
        </table>
    </header>
    <main>
        <dialog class="modal" id="modalMsg">
            <p style="margin-top:auto">
                <img class="cart-status0" src="images/email-sent-icon.jpg">
                Feedback sent successfully
            </p>
            <button class="modalbutton">Close</button>
        </dialog>
        <div class="feedback">
            <h2>Contact and Feedback</h2>
            <form class="contact-email" id="feedback" method="post" action="feedback-email.php">
                <table width="80%">
                    <tr>
                        <td width="12%">*Name:</td>
                        <td><input type="text" id="fbname" name="name" required></td>
                    </tr>
                    <tr>
                        <td width="12%">*Your Email:</td>
                        <td><input type="email" placeholder="Enter your email address" id="fbemail" name="email" required></td>
                    </tr>
                    <tr>
                        <td>Order Ref:</td>
                        <td><input type="text" id="fborder" name="order"></td>
                    </tr>
                    <tr>
                        <td>*Subject:</td>
                        <td>
                            <input type="text" id="fbsubject" name="subject" required>
                            or select Subject:
                            <select id="subjectoptions" name="subopt">
                                <option value="">Select subject line</option>
                                <option value="info">Delivery options</option>
                                <option value="delivery">Payment options</option>
                                <option value="payment">Size options</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>*Message:</td>
                        <td><textarea style="width: 490px; height: 100px; border: 1px solid #ccc;" form="feedback" name="message" required></textarea></td>
                    </tr>
                </table>
                <div style="margin-left: 90px">
                    <!--<button onclick="sendEmail(fbsubject.value,detail.value)">Send email</button>-->
                    <input id="btn" type="submit" name="" value="Send Email">
<!--                    <button>Send email</button>-->
                    <div style="<?php echo $confDisplay; ?> color: red; font-size:14px">
<!--                            <em>Message was sent successfully</em>-->
                            <script>
                                var sent='<?php echo $confDisplay; ?>';
                                if (sent=="display:inline;") {
                                    const dlg=document.querySelector('#modalMsg');
                                    dlg.showModal();
                                    const closeModal = document.querySelector(".modalbutton");
                                    closeModal.addEventListener("click", () => {
                                        dlg.close();
                                    });
                                 }
                            </script>
                    </div>
                </div>
            </form>
        </div>

        <dialog class="modal" id="modal">
            <p style="margin-top:auto">
                <img class="cart-status0" src="images/cart-none.png">
                No items added to the Cart yet
            </p>
            <button class="modalbutton">Close</button>
        </dialog>
    </main>

    <footer>
        <div class="grid-container">
            <div class="footer-area1">
                <h4>Contact us:</h4>
                <p><span>Email:</span> somewhere@gmail.com</p>
                <p><span>Tel (Mobile & Whatsapp):</span> 082-672-3452 (South Africa)</p>
                <p><span>Opening times:</span> 08:00 to 20:00 (GMT +2)</p>
                <p><span>Address:</span> Brackendown, Alberton, Gauteng, South Africa</p>
            </div>
            <div class="footer-area2">
                <p></p>
                <a href="#"><img src="images/facebook-3-xl.png" width="20" /></a>
                <br><br>
                <a href="#"><img src="images/instagram-3-xl.png" width="20" /></a>
                <br><br>
                <a href="#"><img src="images/whatsapp-xl.png" width="20" /></a>
            </div>
        </div>
    </footer>
    <script src="js/common.js"></script>
    <script>
        window.addEventListener('load', function () {
            const input2 = document.querySelector(".cart-count");
            const input3 = document.querySelector(".total");
            if (window.sessionStorage.getItem('inputValue1') != null) {
                input2.innerHTML = window.sessionStorage.getItem('inputValue1');
                input3.innerHTML = window.sessionStorage.getItem('inputValue2');
            }
            else {
                window.sessionStorage.setItem('inputValue1', input2.innerHTML);
                window.sessionStorage.setItem('inputValue2', input3.innerHTML);
            }
        });
        // Function to send email
        function sendEmail(subject, body) {
            var recipient = 'cyberhome101@gmail.com';
            var ccRecipient = 'cyberhome101@gmail.com';
            //var subject = 'Subject Line for the Email';
            //var body = 'This is the body of the email. You can include specific text here.';
            var mailToLink = 'mailto:' + recipient + '?cc=' + ccRecipient + '&subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
            window.location.href = mailToLink;
        }
    </script>
</body>
</html >
