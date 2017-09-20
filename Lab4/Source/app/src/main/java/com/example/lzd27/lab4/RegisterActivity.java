package com.example.lzd27.lab4;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.EditText;

/**
 * Created by lzd27 on 2017/9/21.
 */

public class RegisterActivity extends AppCompatActivity {
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);


    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }
    public void register(View v)
    {
        EditText usernameCtrl = (EditText)findViewById(R.id.txt_email);
        EditText emailCtrl = (EditText)findViewById(R.id.txt_email);
        EditText passwordCtrl = (EditText) findViewById(R.id.txt_Pwd);

        String userName = usernameCtrl.getText().toString();
        String password = passwordCtrl.getText().toString();
        String email =  emailCtrl.getText().toString();

        Intent redirect = new Intent(RegisterActivity.this, LoginActivity.class);
        startActivity(redirect);

    }

    public void change(View v)
    {
        Intent redirect = new Intent(RegisterActivity.this, GoogleSignInActivity.class);
        startActivity(redirect);

    }
}
